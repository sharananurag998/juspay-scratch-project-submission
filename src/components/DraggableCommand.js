// Draggable command component
import React from 'react'
import { useDrag } from 'react-dnd'
import SnapCommandArea from './SnapCommandArea';

function DraggableCommand({children, bg, absolute=false, left=0, top=0, dropped=false, id, commands, setCommands, lastId, setLastId, action, value}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'command',
        item: {children, bg, left, top, dropped, id, action, value},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [children, left, top])


    return (
        <React.Fragment key={id}>
            {absolute&&<SnapCommandArea left={left} top={top} commands={commands} setCommands={setCommands} lastId={lastId} setLastId={setLastId}/>}
            <div ref={drag} className={`flex flex-row flex-wrap text-white px-2 py-1 my-2 z-10 text-sm cursor-pointer ${bg=="yellow"?"bg-yellow-500":bg=="blue"?"bg-blue-500":bg=="purple"?"bg-purple-500":bg=="orange"?"bg-[orange]":""} ${absolute&&`absolute`}`} style={{top: top, left: left}}>
                {children}
            </div>
            {absolute&&<SnapCommandArea left={left} top={top} commands={commands} setCommands={setCommands} lastId={lastId} setLastId={setLastId} bottom/>}
        </React.Fragment>
    )
}

export default DraggableCommand
