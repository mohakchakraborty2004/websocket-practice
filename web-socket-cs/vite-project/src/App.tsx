import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [msgs , setMsgs] = useState<string | any>("")
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [input , setInput] = useState<string>("")


   useEffect(() => {
    const Socket= new WebSocket("ws://localhost:8080");
  
    Socket.onopen = () => {
      console.log("connected")
      setSocket(Socket)
    }

    Socket.onmessage = (message) => {
      console.log("recieved msg : ", message.data)
      setMsgs(message.data)
    }

    Socket.close()

    
   }, [])


   if(!socket){
    return <div>
  loading.......
  connecting to socket
    </div>
   }
  return (
    <>
     socket connected
     -------{msgs}------

     <div>
      <input type="text" onChange={(e)=> {
        setInput(e.target.value)
      }} />
      <button onClick={()=> {
        socket.send(input)
      }}>hello</button>
     </div>
    </>
  )
}

export default App
