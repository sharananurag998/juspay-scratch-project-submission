import React from "react";
import Icon from "./Icon";
import DraggableCommand from './DraggableCommand';

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      
      <DraggableCommand bg="yellow">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </DraggableCommand>
      <DraggableCommand bg="yellow">
        {"When this sprite clicked"}
      </DraggableCommand>

      <div className="font-bold"> {"Motion"} </div>
      
      <DraggableCommand bg="blue">
        {"Move 10 steps"}
      </DraggableCommand>
      <DraggableCommand bg="blue">
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </DraggableCommand>
      <DraggableCommand bg="blue">
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </DraggableCommand>
    </div>
  );
}
