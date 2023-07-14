'use client'
import { useEffect, useState } from "react";

export default function BasicExcalidraw() {
  const [Excalidraw, setExcalidraw] = useState<any>(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setExcalidraw(comp.Excalidraw));
  }, []);

  return (
    <div className="h-full w-full">
      <>
        {Excalidraw && <Excalidraw theme="dark" />}
      </>
    </div>
  )
}