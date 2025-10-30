import {useState, useCallback, useEffect, useRef} from "react";

import './index.css'

function App() {

    const [length, setLength] = useState(8)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed, setcharAllowed] = useState(false)
    const [password, setPassword] = useState('')

    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(() => {
        let password = ''
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

        if (numberAllowed) str += "0123456789"
        if(charAllowed) str += "!@#$%^&*()_+~"

        for (let i = 1; i < length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)

            password += str.charAt(char)
        }

        setPassword(password)
    }, [length, numberAllowed,charAllowed,setcharAllowed])

    

    const copyPassword = useCallback(
        () => {
            passwordRef.current?.select()
            passwordRef.current?.setSelectionRange(0,length)
            window.navigator.clipboard.writeText(password)
        },
        [password],
    );



    useEffect(() => {passwordGenerator()} , [length,numberAllowed,charAllowed,passwordGenerator])

  return (
      <>
          <div className="flex justify-center items-center text-4xl text-white px-4 my-8 shadow-2xl">
            Password Generator using REACT
          </div>

          <div className= "w-full max-w-md mx-auto px-4 py-4 my-8 bg-gray-800 rounded-2xl text-orange-500 shadow-2xl ">
              <div className= " flex shadow rounded-xl overflow-hidden mb-4">
                  <input type="text"
                    value={password}
                    className= "outline-none w-full py-1 px-3"
                    placeholder="Password"
                    ref={passwordRef}
                  />

                  <button onClick={copyPassword} className=" w-1/2 bg-blue-500"

                  >
                      COPY

                  </button>
              </div>

              <div className="flex text-md gap-x-2">

                  <div className="flex items-center gap-x-1">
                      <input type="range"
                             min={6}
                             max={25}
                             value={length}
                             className="cursor-pointer"
                             onChange={(e) => {
                                 setLength(e.target.value)
                             }}
                      />

                      <label>
                          Length: {length}
                      </label>
                  </div>

                  <div className="flex items-center gap-x-1">
                      <input type="checkbox"
                             defaultChecked={numberAllowed}
                             id="numberAllowed"
                             onChange={(e) => {
                                 setNumberAllowed((prev) => !prev);
                             }}
                      />

                      <label htmlFor="numberAllowed">Numbers</label>
                  </div>

                  <div className="flex items-center gap-x-1">
                      <input type="checkbox"
                             defaultChecked={charAllowed}
                             id="charAllowed"
                             onChange={(e) => {
                                 setcharAllowed((prev) => !prev);
                             }}
                      />

                      <label htmlFor="charAllowed">Characters</label>
                  </div>

                
    


              </div>

          </div>
      </>
  )
}

export default App
