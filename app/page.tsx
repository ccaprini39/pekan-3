'use client'
// import { Excalidraw } from "@excalidraw/excalidraw";
import { MemoExoticComponent, useEffect, useState } from "react";

export default function Home() {
  const [Excalidraw, setExcalidraw] = useState<any>(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setExcalidraw(comp.Excalidraw));
  }, []);

  return (
    <div className="h-screen">
      <h1
        className="text-center text-4xl font-bold text-gray-800"
      >
        Excalidraw
      </h1>
      <>{Excalidraw && <Excalidraw theme="dark" />}</>
    </div>
  )
}
