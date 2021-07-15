import React, {useState, useEffect} from "react";
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
  const [spriteTop, setSpriteTop] = useState(100);
  const [spriteLeft, setSpriteLeft] = useState(0);
  const [spriteRotate, setSpriteRotate] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  //Used to animate the sprite when flag is clicked
  const animateSprite = async() => {
    var flagIndex = -1;
    if(commands.length===0)
      return;
    for(var i=0; i<commands.length; i++){
      if(commands[i].action=="flagClicked")
      {
        flagIndex=i;
        break;
      }
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));

    var commandsList;
    if(flagIndex>-1)
      commandsList = commands.slice(flagIndex+1);
    commandsList.map(async(item, index)=>{
      switch(item.action){
        case "move": setSpriteLeft(spriteLeft=>spriteLeft+item.value*Math.cos(spriteRotate*(Math.PI / 180)));
                     setSpriteTop(spriteTop=>spriteTop+item.value*Math.sin(spriteRotate*(Math.PI / 180)));
                     break;
        case "turn_left": setSpriteRotate(spriteRotate=>spriteRotate-item.value); break;
        case "turn_right": setSpriteRotate(spriteRotate=>spriteRotate+item.value); break;
        case "wait": await delay(item.value); break;
        case "sayHello": setBubbleOpen(true); 
                         if(item.value>0){
                           setTimeout(function(){ setBubbleOpen(false) }, item.value*1000);
                         }
                         break;
      }
    })
  }

  useEffect(() => {
    console.log(commands);
  }, [commands])
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row  ">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar commands={commands} setCommands={setCommands} lastId={lastId} setLastId={setLastId}/>
            <MidArea commands={commands} setCommands={setCommands} animateSprite={animateSprite} lastId={lastId} setLastId={setLastId}/>
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea sprites={sprites} setSprites={setSprites} currentSprite={currentSprite} setCurrentSprite={setCurrentSprite} spriteTop={spriteTop} spriteLeft={spriteLeft} spriteRotate={spriteRotate} bubbleOpen={bubbleOpen}/>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
