// Draggable command component
import React from 'react'
import { useDrag } from 'react-dnd'

function DraggableCommand({children, bg, absolute=false, left=0, top=0, dropped=false, id}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'command',
        item: {children, bg, left, top, dropped, id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [children, left, top])


    return (
        <div ref={drag} className={`flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer ${bg=="yellow"?"bg-yellow-500":bg=="blue"?"bg-blue-500":""} ${absolute&&`absolute`}`} style={{top: top, left: left}}>
            {children}
        </div>
    )
}

export default DraggableCommand
