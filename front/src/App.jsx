import { useState, useRef, useCallback, useEffect } from "react"
import { socket, SocketContext, SOCKET_EVENT } from "../src/service/socket"

import NicknameForm from "./components/NicknameForm"
import ChatRoom from "./components/ChatRoom"

export const roomname = "메인룸"

function App() {
  const prevNickname = useRef(null)
  const [nickname, setNickname] = useState("김민찬")

  useEffect(() => {
    if (prevNickname.current) {
      socket.emit(SOCKET_EVENT.UPDATE_NICKNAME, {
        prevNickname: prevNickname.current,
        nickname,
      });
    } else {
      socket.emit(SOCKET_EVENT.JOIN_ROOM, { nickname });
    }
  }, [nickname]);
  
  const handleSubmitNickname = useCallback(newNickname => {
    prevNickname.current = nickname;
    setNickname(newNickname);
  },
    [nickname]
  );

  return (
    <SocketContext.Provider value={socket}>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <NicknameForm handleSubmitNickname={handleSubmitNickname} />
        <ChatRoom nickname={nickname} roomname={roomname} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;