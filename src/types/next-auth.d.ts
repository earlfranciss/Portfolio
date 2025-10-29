import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

interface Session extends DefaultSession {
  accessToken?: string;
  refreshToken?: string;
}


interface JWT {
  accessToken?: string;
  refreshToken?: string;
}
