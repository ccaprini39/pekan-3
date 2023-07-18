'use client'
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { NoteObject, saveNote } from "../api/data-management/db-notes";

export default function DebugExcalidraw() {

  const [Excalidraw, setExcalidraw] = useState<any>(null);
  const [elements, setElements] = useLocalStorage({ key : 'localElements', defaultValue : []});
  const [state, setState] = useLocalStorage<any>({ key : 'localState', defaultValue : {zenModeEnabled: true, viewBackgroundColor: "#a5d8ff"}});


  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setExcalidraw(comp.Excalidraw));
  }, []);

  async function saveNoteToDb(){
    const defaultUser = 'rec_cir8vbtpf9tn4kjf14p0'
    const note : NoteObject = {
      user: defaultUser,
      title: 'test note',
      note: JSON.stringify(elements)
    }
    const result = await saveNote(note)
    if (result === true) alert('saved')
    else alert('error')
  }

  function getInitialData() {
    if (elements.length > 0) {
      if (state) {
        console.log(state)
        if (state.collaborators) {
          //set state collaborators to empty array
          state.collaborators = []
        }
        return { elements, appState: state, scrollToContent: true }
      }
      return { elements}
    }
  }

  return (
    <div className="h-full w-full">
      <div className="h-1/2">
        <button className='btn-square' onClick={saveNoteToDb}>Save</button>
        {Excalidraw && 
          <Excalidraw 
            initialData={getInitialData()}
            onChange={
              (elements: any[], state: any) => {
                setElements(elements as any) 
                setState(state as any)}
            }
            theme="dark" 
          />
        }
      </div>
      <div className="h-1/2 p-5 overflow-y-auto">
        <pre>
          {JSON.stringify(elements, null, 2)}
        </pre>
      </div>
    </div>
  )
}

/**
 * ExcalidrawProps
 * @typedef {object} ExcalidrawProps
 * @property {object | null | Promise<object | null>} initialData The initial data with which app loads.
 * @property {object} ref Ref to be passed to Excalidraw
 * @property {boolean} isCollaborating This indicates if the app is in collaboration mode
 * @property {(elements: any[], state: any) => void} onChange This callback is triggered whenever the component updates due to any change. This callback will receive the excalidraw elements and the current app state.
 * @property {(payload: any) => void} onPointerUpdate Callback triggered when mouse pointer is updated.
 * @property {(payload: any) => void} onPointerDown This prop if passed gets triggered on pointer down evenets
 * @property {(payload: any) => void} onScrollChange This prop if passed gets triggered when scrolling the canvas.
 * @property {(payload: any) => void} onPaste Callback to be triggered if passed when the something is pasted in to the scene
 * @property {(libraryItems: any[]) => void} onLibraryChange The callback if supplied is triggered when the library is updated and receives the library items.
 * @property {(payload: any) => void} onLinkOpen The callback if supplied is triggered when any link is opened.
 * @property {string} langCode Language code string to be used in Excalidraw
 * @property {() => void} renderTopRightUI Render function that renders custom UI in top right corner
 * @property {() => void} renderCustomStats Render function that can be used to render custom stats on the stats dialog.
 * @property {() => void} renderSidebar Render function that renders custom sidebar.
 * @property {boolean} viewModeEnabled This indicates if the app is in view mode.
 * @property {boolean} zenModeEnabled This indicates if the zen mode is enabled
 * @property {boolean} gridModeEnabled This indicates if the grid mode is enabled
 * @property {string} libraryReturnUrl What URL should libraries.excalidraw.com be installed to
 * @property {"light" | "dark"} theme The theme of the Excalidraw component
 * @property {string} name Name of the drawing
 * @property {object} UIOptions To customise UI options. Currently we support customising canvas actions
 * @property {boolean} detectScroll Indicates whether to update the offsets when nearest ancestor is scrolled.
 * @property {boolean} handleKeyboardGlobally Indicates whether to bind the keyboard events to document.
 * @property {boolean} autoFocus indicates whether to focus the Excalidraw component on page load
 * @property {() => void} generateIdForFile Allows you to override id generation for files added on canvas
 */
export interface ExcalidrawProps {
  initialData?: object | null | Promise<object | null>; //The initial data with which app loads.The initial data with which app loads.
  ref?: object; //Ref to be passed to Excalidraw
  isCollaborating?: boolean; //This indicates if the app is in collaboration mode
  onChange?: (elements: any[], state: any) => void; //This callback is triggered whenever the component updates due to any change. This callback will receive the excalidraw elements and the current app state.
  onPointerUpdate?: (payload: any) => void; //Callback triggered when mouse pointer is updated.
  onPointerDown?: (payload: any) => void; //This prop if passed gets triggered on pointer down evenets
  onScrollChange?: (payload: any) => void; //This prop if passed gets triggered when scrolling the canvas.
  onPaste?: (payload: any) => void; //Callback to be triggered if passed when the something is pasted in to the scene
  onLibraryChange?: (libraryItems: any[]) => void; //The callback if supplied is triggered when the library is updated and receives the library items.
  onLinkOpen?: (payload: any) => void; //The callback if supplied is triggered when any link is opened.
  langCode?: string; //Language code string to be used in Excalidraw
  renderTopRightUI?: () => void; //Render function that renders custom UI in top right corner
  renderCustomStats?: () => void; //Render function that can be used to render custom stats on the stats dialog.
  renderSidebar?: () => void; //Render function that renders custom sidebar.
  viewModeEnabled?: boolean; //This indicates if the app is in view mode.
  zenModeEnabled?: boolean; //This indicates if the zen mode is enabled
  gridModeEnabled?: boolean; //This indicates if the grid mode is enabled
  libraryReturnUrl?: string; //What URL should libraries.excalidraw.com be installed to
  theme?: "light" | "dark"; //The theme of the Excalidraw component
  name?: string; //Name of the drawing
  UIOptions?: object; //To customise UI options. Currently we support customising canvas actions
  detectScroll?: boolean; //Indicates whether to update the offsets when nearest ancestor is scrolled.
  handleKeyboardGlobally?: boolean; //Indicates whether to bind the keyboard events to document.
  autoFocus?: boolean; //indicates whether to focus the Excalidraw component on page load
  generateIdForFile?: () => void; //Allows you to override id generation for files added on canvas
}