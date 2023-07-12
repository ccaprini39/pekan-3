'use client'
import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";

export default function Home() {
  // const [Excalidraw, setExcalidraw] = useState(null);
  // useEffect(() => {
  //   import("@excalidraw/excalidraw").then((comp) => setExcalidraw(comp.Excalidraw));
  // }, []);

  return (
    <div className="h-screen">
      <h1
        className="text-center text-4xl font-bold text-gray-800"
      >
      </h1>
      <Excalidraw theme="dark" />

    </div>
  )
}
