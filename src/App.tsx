import { useState } from 'react'
import {nanoid} from "nanoid"
import Calculation from "./Calculation.tsx"

export interface ListArg{
  Id:ReturnType<typeof nanoid>,
  name:string,
  value:string,
}

function App() {
  const [args ,setArgs] = useState<ListArg[]>([{
    Id:nanoid(),
    name:"My Arg",
    value:"True"
  }])
  const [booleanValue,SetBooleanValue]=useState<boolean[]>([])

  function handelArgChange(Id:String,name:string){
    setArgs(oldArgs =>{
      return oldArgs.map(arg =>{
        if(arg.Id==Id)
          return{
            ...arg,
            name
          }
        return arg
      })
    })
  }

  function handelArgValueChange(Id:string,value:string){
    setArgs(oldArgs =>{
      return oldArgs.map(arg =>{
        if(arg.Id==Id)
          return{
            ...arg,
            value,
          }
        return arg
      })
    })
  }

  function addArg(){
    setArgs(oldArg=>{
      return [
      ...oldArg,
      {
        Id:nanoid(),
        name:"",
        value:"True"
      }
    ]
    })
  }


  const argsComponent= args.map(arg =>{
    return(
      <div key={arg.Id}>
        <input
          value={arg.name}
          onChange={(e) => handelArgChange(arg.Id,e.target.value)}
        />
        <select 
          value={arg.value}
          onChange={(e)=>handelArgValueChange(arg.Id,e.target.value)}>
          <option>True</option>
          <option>False</option>
        </select>
      </div>
    )
  })

  return (
    <>
      {argsComponent}
      <button
        onClick={()=>addArg()}>+ Add arg
      </button>
      <div className='calculation'>
        <Calculation
          SetfinalValue={SetBooleanValue}
          index={0}
          args={args}
          />
      </div>
      <h3>result: {String(booleanValue[0])}</h3>
    </>
  )
}

export default App
