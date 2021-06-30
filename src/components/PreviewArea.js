import React, {useState} from "react";
import CatSprite from './Sprites/CatSprite';

const spriteList = [
  {
      name: "Orange Cat",
      fill: "#FFAB19"
  },
  {
      name: "Red Cat",
      fill: "#FF0000"
  },
  {
      name: "Blue Cat",
      fill: "#0000FF"
  },
  {
      name: "Green Cat",
      fill: "#00FF00"
  }
]

export default function PreviewArea({sprites, setSprites, currentSprite, setCurrentSprite}) {
  const [spriteSelectorOpen, setSpriteSelectorOpen] = useState(false)

  const addSprite = (index) => {
    if(!sprites.includes(index)){
      setSprites(old=>[...old, index])
    }
    else{
      setSprites(old => old.filter(item=> item!=index))
    }
  }

  return (
    <div className="flex items-start flex-row flex-wrap flex-none h-full overflow-y-auto p-2">
      {
        sprites?.map((item, index)=>(
          <div className="p-1 hover:bg-gray-400 cursor-pointer">
            <CatSprite fill={spriteList[item].fill} key={index} />
          </div>
        ))
      }
      {spriteSelectorOpen&&
        <div className="flex flex-col absolute rounded-xl bottom-10 h-[40vh] w-[30vw] p-10 bg-[#E5E5E5]">
          <h1 className="text-lg font-semibold">Add Sprite</h1>
          <div className="flex flex-row items-center justify-around mt-8">
          {
            spriteList.map((item, index)=>(
              <div onClick={()=>addSprite(index)} className={`p-1 cursor-pointer ${sprites.includes(index)?"bg-green-300":"hover:bg-gray-400"}`}><CatSprite fill={item.fill} key={index} /></div>
            ))
          }
          </div>
        </div>
      }
      {!spriteSelectorOpen
        ?
          <button onClick={()=>setSpriteSelectorOpen(true)} className="p-0 pb-1 w-16 absolute flex items-center justify-center right-11 bottom-10 text-white text-3xl h-16 bg-green-500 rounded-full hover:bg-green-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            +
          </button>
        :
          <button onClick={()=>setSpriteSelectorOpen(false)} className="p-0 pb-1 w-16 absolute flex items-center justify-center right-11 bottom-10 text-white text-3xl h-16 bg-red-500 rounded-full hover:bg-red-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            x
          </button>
      }
    </div>
  );
}
