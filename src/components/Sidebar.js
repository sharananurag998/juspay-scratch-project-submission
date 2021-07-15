import React from "react";
import Icon from "./Icon";
import DraggableCommand from './DraggableCommand';
import {useDrop} from "react-dnd"
import update from 'immutability-helper';

export default function Sidebar({commands, setCommands}) {
  const [, drop] = useDrop({
    accept: "command",
    drop(item, monitor) {
      if(item.dropped){
        setCommands(commands=>update(commands, arr=>arr.filter(elem => elem.id!=item.id)))
      }
    }
  })

  return (
    <div ref={drop} className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      
      <DraggableCommand bg="yellow" action="flagClicked">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </DraggableCommand>
      <DraggableCommand bg="yellow" action="spriteClicked">
        {"When this sprite clicked"}
      </DraggableCommand>

      <div className="font-bold"> {"Motion"} </div>
      
      <DraggableCommand bg="blue" action="move" value={10}>
        {"Move 10 steps"}
      </DraggableCommand>
      <DraggableCommand bg="blue" action="turn_left" value={15}>
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </DraggableCommand>
      <DraggableCommand bg="blue" action="turn_right" value={15}>
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </DraggableCommand>

      <div className="font-bold"> {"Looks"} </div>
      <DraggableCommand bg="purple" action="sayHello" value={2}>
        {"Say Hello! for 2 seconds"}
      </DraggableCommand>

      <DraggableCommand bg="purple" action="sayHello">
        {"Say Hello!"}
      </DraggableCommand>

      {/* <DraggableCommand bg="purple" action="thinkHmm" value={2}>
        {"Think Hmm for 2 seconds"}
      </DraggableCommand> */}

      <div className="font-bold"> {"Control"} </div>
{/* 
      <DraggableCommand bg="orange" action="wait" value={1000}>
        {"Wait 1 seconds"}
      </DraggableCommand> */}

      <DraggableCommand bg="orange" action="stopAll">
        {"Stop all"}
      </DraggableCommand>
    </div>
  );
}
