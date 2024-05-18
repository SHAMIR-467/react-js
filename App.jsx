import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setlength]=useState(8)
  const [password , setpassword]= useState("")
  const[numberallowed ,setnumberallowed]=useState(false)
  const[charallowed, setcharallowed]=useState(false)

  //hookstate use ref
  const passwordRef=useRef(null)
  const passwordgenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str+="0123456789"
    if(charallowed) str+="!@#$%^&*()_+?><:><.,';[]=-"
     
     for(let i=1; i<length; i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
     }
     setpassword(pass)
  },[length,numberallowed,charallowed,setpassword])
  const copypasswordtoclipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setselectionRange(0,25);
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordgenerator()
  },[length,numberallowed,charallowed,passwordgenerator]
)
  return (
    <>
      <div className='w-full h-full max-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500'>
             <h1 className='text-white text-center my-3'>PASSWORD GENERATOR </h1>
             <div className='flex shadow   p-5  rounded-lg overflow-hidden mb-8'>
                <input 
                  type='text'
                  value={password}
                  placeholder='password'
                  readOnly
                  ref={passwordRef}
                />
                <button onClick={copypasswordtoclipboard} 
                className='outline-non bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy </button>
             </div>
             <div>
              <input 
                type="range"
                min={6}
                 max={25}
                 value={length}
                 className='cursor-pointer'
                 onChange={(e)=>setlength(e.target.value)}
                 />
                 <label> length: {length}</label>
             </div>  
             <div className='flex item-center gap-x-1'>
              <input 
                type='checkbox'
                defaultChecked={numberallowed}
                id='numberInput'
                onChange={() => {
              setnumberallowed((prev) => !prev);
            }}
              />
              <label  htmlFor ="numberInput">number</label>
             </div>
             <div className='flex item-center gap-x-1'>
              <input 
                type='checkbox'
                defaultChecked={charallowed}
                id='characterInput'
                onChange={() => {
                 setcharallowed((Prev) = !prev);
                 }}
              />
              <label htmlFor='characterInput'>character</label>
             </div>
      </div>



    </>
  )
}

export default App