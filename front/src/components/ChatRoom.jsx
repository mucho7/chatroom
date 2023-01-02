import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

function ChatRoom({ nickname, roomname }) {
  return (
    <div
      className="d-flex flex-column"
      style={{ width: 1000 }}
    >
      <div className="text-box">
        <span>{roomname}에 접속 중입니다.</span>
      </div>
      <MessageList />
      <MessageForm nickname={nickname} />
    </div>
  );
}
export default ChatRoom;