'use server'
import { get_encoding } from "tiktoken";

export async function getTokensFromString(strToEncode: string){
  const encoding = get_encoding('cl100k_base')
  const tokens = encoding.encode(strToEncode)
  console.log(tokens)
  return tokens
}