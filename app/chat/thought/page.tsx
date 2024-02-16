import HorizontalComponentsResize from "@/app/components/HorizontalComponentsResize";
import ThoughtComponent from "./ThoughtComponent";
import { ChatPageComponent } from "../client/RenderMessage";

export default function ThoughtPage(){
  return (
    <div
      className="w-screen h-screen max-h-screen max-w-screen"
    >
      <ThoughtComponent />
    </div>
  )
}