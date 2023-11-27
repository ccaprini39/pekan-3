

import React from "react";
import BasicEditor from "../components/BasicEditor";
import { BasicTimer } from "../components/Timer";

export default function AndonPage() {
  return (
    <div 
      className="h-full w-full"
    >
      {/* <BasicEditor /> */}
      <BasicTimer 
        length={60}
      />
    </div>
  )
}

// first is a very basic to do list component

//what I want to do next is make a wysiwyg editor
