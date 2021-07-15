import React, {useRef, useCallback, useState} from "react";
import {useDrop} from "react-dnd"
import DraggableCommand from "./DraggableCommand";
import update from 'immutability-helper';
import Icon from "./Icon";

export default function MidArea({commands, setCommands, lastId, setLastId, animateSprite}) {
  const ref = useRef(null)
  const createOrUpdateCommand = useCallback((children, bg, left, top, dropped, id, action, value) => {
      if(!dropped){
        //If the command is not already present in canvas, create a new command
        setCommands(old=>[...old, {action, value, data: children, bg, left, top, id: lastId+1}])
        setLastId(old=>old+1)
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
          return; //If dropped in child, return from function
      }
      const delta = monitor.getClientOffset();
      const left = delta.x;
      const top = delta.y;
      createOrUpdateCommand(item.children, item.bg, left, top, item.dropped, item.id, item.action, item.value)
    }
  })

  return <div ref={drop} className="h-full flex-1 overflow-auto block">
      <Icon name="flag" onClick={()=>animateSprite()} size={45} className="text-green-600 mx-2 right-2 top-10 p-2 cursor-pointer hover:bg-gray-200" />
      {commands.map((item, index)=>(
        <DraggableCommand bg={item.bg} absolute top={item.top} left={item.left} dropped id={item.id} key={item.id} commands={commands} setCommands={setCommands} lastId={lastId} setLastId={setLastId}>{item.data}</DraggableCommand>
      ))}
  </div>;
}
