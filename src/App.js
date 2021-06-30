import React, {useState} from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App() {
  const [sprites, setSprites] = useState([0]); //Stores the sprite ids of selected sprites
  const [currentSprite, setCurrentSprite] = useState(0); //Stores the sprite id of the current sprite
  const [commands, setCommands] = useState([]); //Stores the commands in the canvas
  const [lastId, setLastId] = useState(-1); //Stores the id of the last command in canvas
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row  ">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar commands={commands} setCommands={setCommands} lastId={lastId} setLastId={setLastId}/>
            <MidArea commands={commands} setCommands={setCommands} lastId={lastId} setLastId={setLastId}/>
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea sprites={sprites} setSprites={setSprites} currentSprite={currentSprite} setCurrentSprite={setCurrentSprite}/>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
