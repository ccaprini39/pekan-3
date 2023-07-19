'use client'
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { NoteObject, saveNote } from "../api/data-management/db-notes";
import { MainMenu } from "@excalidraw/excalidraw";

export default function DebugExcalidraw() {

  const [Excalidraw, setExcalidraw] = useState<any>(null);
  const [elements, setElements] = useLocalStorage({ key: 'localElements', defaultValue: [] });
  const [state, setState] = useLocalStorage<any>({ key: 'localState', defaultValue: { zenModeEnabled: true, viewBackgroundColor: "#a5d8ff" } });


  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setExcalidraw(comp.Excalidraw));
  }, []);

  async function saveNoteToDb() {
    const defaultUser = 'rec_cir8vbtpf9tn4kjf14p0'
    const note: NoteObject = {
      user: defaultUser,
      title: 'test note',
      note: JSON.stringify(elements)
    }
    const result = await saveNote(note)
    if (result === true) alert('saved')
    else alert('error')
  }

  async function loadNoteFromDb() {

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
      return { elements }
    }
  }

  return (
    <div className="h-full w-full">
      <div className="h-full">
        {Excalidraw &&
          <Excalidraw
            initialData={getInitialData()}
            onChange={
              (elements: any[], state: any) => {
                setElements(elements as any)
                setState(state as any)
              }
            }
            theme="dark"
          >
            <MainMenu>
              <MainMenu.DefaultItems.LoadScene />
              <MainMenu.DefaultItems.Export />
              <MainMenu.DefaultItems.SaveAsImage />
              <MainMenu.Item
                icon={saveIconSvg()}
                onSelect={saveNoteToDb}
              >
                Save to DB
              </MainMenu.Item>
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>
          </Excalidraw>
        }
      </div>
      <div className=" hidden p-5 overflow-y-auto">
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

//icon that looks like a floppy disk
function saveIconSvg() {
  return (
    <svg fill="#cbd5e0" height="200px" width="200px" version="1.1" id="Layer_1" viewBox="0 0 512 512">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" color="white"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <g>
              <path d="M488.213,137.6l-112-133.76C374.187,1.387,371.2,0,368,0H54.4C36.16,0,21.333,14.72,21.333,32.96v446.08 C21.333,497.28,36.16,512,54.4,512h403.2c18.24,0,33.067-14.72,33.067-32.96V144.427 C490.667,141.973,489.813,139.52,488.213,137.6z M106.667,21.333h202.667v64H106.667V21.333z M469.333,479.04 c0,6.4-5.333,11.627-11.733,11.627H54.4c-6.4,0-11.733-5.227-11.733-11.627V32.96c0-6.4,5.333-11.627,11.733-11.627h30.933V96 c0,5.867,4.8,10.667,10.667,10.667h224c5.867,0,10.667-4.8,10.667-10.667V21.333h32.32l106.347,127.04V479.04z"></path>
              <path d="M256,178.453c-42.987,0-77.867,34.773-77.867,77.547c0,42.773,34.987,77.547,77.867,77.547s77.867-34.773,77.867-77.547 C333.867,213.227,298.88,178.453,256,178.453z M256,312.213c-31.04-0.107-56.107-25.493-56-56.533 c0.107-31.04,25.493-56.107,56.533-56c30.933,0.107,56,25.28,56,56.213C312.427,287.147,287.147,312.32,256,312.213z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}