import { useEffect, useState } from "react";
import { ListArg } from "./App";
import { Dispatch, SetStateAction } from "react";

export default function Calculation({args,index,SetfinalValue}:{args:ListArg[],index:number,SetfinalValue:Dispatch<SetStateAction<boolean[]>>}){
    const [select,SetSelect]=useState<string>("select...")
    const [currentOp,SetCurrentOp]=useState<string>()
    const [constant,SetConstant]=useState<string>("True")
    const [argument,setArgument]=useState<number>(0)
    const [booleanValue,SetBooleanValue]=useState<boolean[]>([])
    const [childCal,setChildCal]=useState<number>(2)
    useEffect(() => {
        if(select==="argument"){
            SetfinalValue(prevSate =>{
                const stateCopy=[...prevSate]
                if(stateCopy[index]!=(args[argument].value==="True")){
                    stateCopy[index]=(args[argument].value==="True")
                    return stateCopy
                }
                return prevSate
            })
        }
        else if(select=="constant"){
            SetfinalValue(prevSate =>{
                const stateCopy=[...prevSate]
                if(stateCopy[index]!=(constant==="True")){
                    stateCopy[index]=(constant==="True")
                    return stateCopy
                }
                return prevSate
            })
        }
        else if(currentOp){
            if(currentOp=="and")
                SetfinalValue(prevSate =>{
                    const stateCopy=[...prevSate]
                    if(stateCopy[index]!=!booleanValue.includes(false)){
                        stateCopy[index]=!booleanValue.includes(false)
                        return stateCopy
                    }
                    return prevSate
                })
            else if(currentOp=="or"){
                SetfinalValue(prevSate =>{
                    const stateCopy=[...prevSate]
                    if(stateCopy[index]!=booleanValue.includes(true)){
                        stateCopy[index]=booleanValue.includes(true)
                        return stateCopy
                    }
                    return prevSate
                })
            }
        }   
    },[select,constant,currentOp,argument,booleanValue,childCal,args])

    let childCalElement=[]
    for(let i=0;i<childCal;i++)
        childCalElement.push(
            <Calculation 
            SetfinalValue={SetBooleanValue} 
            key={i} 
            index={i} 
            args={args}/> 
        )

    function handelSelect(value:string){
        if(value === "and" || value === "or")
            SetCurrentOp(value)
        SetSelect(value)
        
    }


    const SelectElement= (
    <select value={select}
            onChange={(e)=>handelSelect(e.target.value)}>
        <option disabled>select...</option>
        <option>constant</option>
        <option>argument</option>
        <option>and</option>
        <option>or</option>
    </select>
    )

    const SelectArgElement =(<>
        <select onChange={(e)=>setArgument(Number(e.target.value))}
        >
            <option disabled>select...</option>
            {   args.map((args,index) =>{
                    return <option  value={index} key={index}>
                        {args.name}
                    </option>
                })}
        </select>
        <button
            onClick={()=>{SetSelect("select...")}}
        >X</button>
    </>
    )
    
    return(
        <div>  
            {select === "select..." && 
            <>
                {SelectElement}
                <button
                    onClick={()=>{SetSelect("select...")}}
                >X</button>
            </>
            }
            {select === "argument" && SelectArgElement}
            {select === "constant" && 
                <>
                <select value={constant}
                        onChange={(e)=>SetConstant(e.target.value)}
                    >
                    <option>True</option>
                    <option>False</option>
                </select>
                <button
                        onClick={()=>{SetSelect("select...")}}
                >X</button>
                </>
            }
            {currentOp && <div>
                <select value={currentOp}
                    onChange={(e)=>SetCurrentOp(e.target.value)}>
                    <option>and</option>
                    <option>or</option>
                </select>
                <button
                    onClick={()=>{
                        SetSelect("select...")
                        SetCurrentOp(undefined)
                    }}
                >X</button>
                <div className="box">
                    {childCalElement}
                    <button 
                        onClick={()=>setChildCal(childCal+1)}
                    >+ add op</button>
                </div>
            </div>
            }
        </div>
    )
}