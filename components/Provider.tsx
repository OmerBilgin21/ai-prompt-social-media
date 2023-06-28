"use client";

import { SessionProvider } from "next-auth/react";
import { IProfileObjectSessionObject } from "@interfaces/interfaces";

type Props = {
  session: IProfileObjectSessionObject;
  children: React.ReactNode;
};

const Provider = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
