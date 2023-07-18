import { XataClient } from "@/xata";
import { XataAdapter } from "@auth/xata-adapter";

import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Auth0Provider from "next-auth/providers/auth0";

const client = new XataClient();
const adapter: Adapter = XataAdapter(client) as Adapter;

const clientId = process.env.AUTH0_CLIENT_ID as string;
const clientSecret = process.env.AUTH0_CLIENT_SECRET as string;

export const authOptions = {
  adapter: adapter,
  providers: [
    Auth0Provider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
}

export default NextAuth(authOptions);