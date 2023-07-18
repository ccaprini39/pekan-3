import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

export default async function checkSession(req?: NextApiRequest, res?: NextApiResponse) {
  let session: Session | null = null;
  try {
    if (req && res) {
      session = await getServerSession(req, res, authOptions);
    } else {
      session = await getServerSession(authOptions);
    }
  } catch (e) {
    return null;
  }

  return session;
}
