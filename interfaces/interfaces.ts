export interface IpostCreator {
  __v?: number;
  _id?: string;
  email: string;
  image: string;
  username: string;
}

export interface Iuser {
  email: String;
  picture: String;
  image?: String;
  id?: String;
}

export interface IuserObject {
  user: Iuser;
}

export interface IsessionObject {
  session: IuserObject;
  expires: string;
}

export type IgoogleSessionObject = {
  _id: any;
  __v: any;
  name: String;
  email: String;
  image?: String;
};

export interface Ipost {
  prompt: string;
  creator: IpostCreator;
  tag: string;
  _id?: string;
}

export interface IdynamicIdRoute {
  params: {
    id?: string;
  };
}

export interface IProfileObjectSessionObject {
  user: {
    email: string;
    name: string;
    picture: string;
    id?: string;
  };
  expires: string;
}

export interface IprofileObject {
  session: IProfileObjectSessionObject;
}

export interface signInFunctionProps {
  profile: {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
  };
}

export interface Iproviders {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export interface IproviderObject {
  signinUrl?: string;
  name?: string;
  id?: string;
  callbackUrl?: string;
  type?: string;
}

export type providersObject = { google: IproviderObject[] } | null;

export type PromptCardListType = {
  data: Ipost[];
  handleTagClick: Function;
  handleUserProfile: Function;
};
