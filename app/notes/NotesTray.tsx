import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import PolyComponent from "./sidebar-components/PolymorphicComponent"

export default function NotesTray({ selectedSidebar, setSelectedSidebar, children }: any) {


  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex-grow h-full w-full"
    >
      <ResizablePanel defaultSize={10}>
        <div className="flex h-full items-center justify-center p-2">
          <PolyComponent type={selectedSidebar} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        minSize={10}
        maxSize={600}
        defaultSize={100}
      >
        <div className="flex h-full items-center justify-center">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}