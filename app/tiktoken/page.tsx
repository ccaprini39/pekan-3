"use client";
import { useState, useEffect } from "react";
import { getTokensFromString } from "./server-actions";
import { useDidUpdate } from "@mantine/hooks";
import { Button } from "@/components/ui/button";

export default function TikTokenPage() {
  const [tokens, setTokens] = useState<any>([0]);
  const [string, setString] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // useDidUpdate(() => {
  //   async function loadTokens(){
  //     const fetchedTokens = await getTokensFromString(string)
  //     setTokens(fetchedTokens)
  //     setLoading(false)
  //   }
  //   loadTokens()
  // }, [])

  async function handleTokenize(e: any) {
    e.preventDefault();
    setLoading(true);
    const fetchedTokens = await getTokensFromString(string);
    setTokens(fetchedTokens);
    setLoading(false);
  }

  return (
    <div className="flex flex-col w-screen h-screen p-5">
      <div className="flex flex-row w-full">
        <textarea
          className="w-11/12 "
          value={string}
          placeholder="enter string to tokenize"
          onChange={(e) => setString(e.target.value)}
        />
        <Button className="w-1/12" onClick={handleTokenize}>
          tokenize
        </Button>
      </div>
      <div>
        {loading ? "loading" : JSON.stringify(tokens.length) + " tokens"}
      </div>
      <div>{loading ? "loading" : JSON.stringify(tokens)}</div>
    </div>
  );
}
