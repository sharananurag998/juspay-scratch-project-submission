import React, {useRef, useCallback, useState} from "react";
import {useDrop} from "react-dnd"
import DraggableCommand from "./DraggableCommand";
import update from 'immutability-helper';

export default function MidArea() {
  const ref = useRef(null)
  const [commands, setCommands] = useState([]);
  const createOrUpdateCommand = useCallback((children, bg, left, top, dropped, id) => {
      if(!dropped){
        //If the command is not already present in canvas, create a new command
        setCommands(old=>[...old, {data: children, bg, left, top, id: commands.length}])
      }
      else{
        //If the command is already present in canvas, update the x, y coordinates of command
        setCommands(commands=>update(commands, {
          [id]: {
            $merge: {left, top}
          }
        }))
      }
    },[commands, setCommands])
  
  const [, drop] = useDrop({
    accept: "command",
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
          return;
      }
      const delta = monitor.getClientOffset();
      const left = delta.x;
      const top = delta.y;
      createOrUpdateCommand(item.children, item.bg, left, top, item.dropped, item.id)
    }
  })

  return <div ref={drop} className="h-full flex-1 overflow-auto block">{"mid area"} 
      {commands.map((item, index)=>(
        <DraggableCommand bg={item.bg} absolute top={item.top} left={item.left} dropped id={item.id} key={item.id} commands={commands} setCommands={setCommands}>{item.data}</DraggableCommand>
      ))}
  </div>;
}
