import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/User";

import { connectToDB } from "@utils/database";
import { IprofileObject, signInFunctionProps } from "@interfaces/interfaces";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_OAUTH_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
  ],
  callbacks: {
    // @ts-ignore
    async session({ session }: IprofileObject) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    // @ts-ignore
    async signIn({ profile }: signInFunctionProps) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          const newUser = {
            email: profile.email.toString().toLowerCase(),
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          };

          await User.create(newUser);
        }

        return true;
      } catch (error) {
        console.log("== error ==", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
