import { useState, useCallback, useContext } from "react";
import { SocketContext, SOCKET_EVENT } from "../service/socket";


function MessageForm({ nickname }) {
  const [typingMessage, setTypingMessage] = useState("");
  const socket = useContext(SocketContext);

  const sendMessage = useCallback((message) => {
    const noContent = message.trim() === "";
      // 아무 메시지도 없으면 패스
      if (noContent) {
        return;
      }
      // 메시지가 있으면 nickname과 message를 SEND_MESSAGE 이벤트 타입과 함께 소켓 서버로 전송합니다.
      socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
        nickname,
        content: message,
      });
      // state값은 공백으로 변경해줍니다.
      setTypingMessage("");
  }, [socket, nickname])

  // textarea에서 텍스트를 입력하면 typingMessage state를 변경합니다.
  const handleChangeTypingMessage = useCallback(event => {
    setTypingMessage(event.target.value);
  }, []);

 // 버튼을 누르면 실행
  const handleSendMesssage = useCallback(() => {
    sendMessage(typingMessage)
  }, [sendMessage, typingMessage]);

  // 엔터를 누르면 실행
  const handleKeyDown = useCallback(event => {
    console.log(event)
    if (event.key === "Enter") {
      event.preventDefault()
      sendMessage(typingMessage)
    }
    }, [sendMessage, typingMessage]);

  return (
    <form className="card">
      <div className="d-flex align-items-center">
        <input
          type="textarea"
          className="form-control"
          maxLength={400}
          autoFocus
          value={typingMessage}
          onChange={handleChangeTypingMessage}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="btn btn-primary send-btn"
          onClick={handleSendMesssage}>
          전송
        </button>
      </div>
    </form>
  );
}

export default MessageForm;