import React, {useState, useEffect} from 'react'
import {useDrop} from "react-dnd"
import DraggableCommand from "./DraggableCommand";
import update from 'immutability-helper';

function SnapCommandArea({top, left, commands, setCommands, bottom}) {
    const [isHovered, setIsHovered] = useState(false); //Stores if an element is hovered above this area
    const [command, setCommand] = useState(null);
    const [collectedProps, drop] = useDrop({
        accept: "command",
        hover(item, monitor) {
            setIsHovered(true);
        //   createOrUpdateCommand(item.children, item.bg, left, top, item.dropped, item.id)
        },
        drop(item, monitor){
            console.log("Dropped");
            if(!item.dropped){
                //If the command is not already present in canvas, create a new command
                setCommands(old=>[...old, {data: item.children, bg: item.bg, left, top: bottom?top+28:top-28, id: commands.length}])
            }
            else{
                //If the command is already present in canvas, update the x, y coordinates of command
                setCommands(commands=>update(commands, {
                    [item.id]: {
                        $merge: {left, top: bottom?top+28:top-28}
                    }
                }))
            }
        },
        collect(monitor){
            return{
                isOver: monitor.isOver({ shallow: true })
            }
        }
    })
    useEffect(() => {
        if(!collectedProps.isOver){
            setIsHovered(false);
        }
    }, [collectedProps?.isOver])
    
    return (
            <div ref={drop} className={`w-36 h-6 bg-gray-500 z-0 absolute ${isHovered?"opacity-40":"opacity-0"}`} style={{top: bottom?top+35:top-16, left: left}}>
            </div>
    )
}

export default SnapCommandArea
