import BasicExcalidraw from "../excalidraw/BasicExcalidraw";
import DebugExcalidraw from "../excalidraw/DebugExcalidraw";
import AllNotesView from "./client-components/AllNotesView";
import ViewAllNotes from "./client-components/ViewAllNotes";


export default function NotesPage() {


  return (
    <div className="h-screen w-screen">
      <AllNotesView />
    </div>
  )
}
