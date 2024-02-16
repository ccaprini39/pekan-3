'use client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { is } from "@xata.io/client"
import React from "react"

export default function HorizontalComponentsResize({children}: {children: any[]}) {

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex-grow w-full h-full"
    >
      {children.map((child: any, index: number) => {
        const isLast: boolean = index === children.length - 1
        return (
          <React.Fragment key={index}>
            <ResizablePanel defaultSize={10}>
              <div className="flex items-center justify-center h-full p-2">
                {child}
              </div>
            </ResizablePanel>
            {isLast ? null : <ResizableHandle withHandle />}
          </React.Fragment>
        )
      })}
    </ResizablePanelGroup>
  )
}