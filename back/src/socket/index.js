const SOCKET_EVENT = {
    JOIN_ROOM: "JOIN_ROOM",
    UPDATE_NICKNAME: "UPDATE_NICKNAME",
    SEND_MESSAGE: "SEND_MESSAGE",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
}
  

module.exports = function (socketIo) {
    socketIo.on("connection", function (socket) {
        // 클라이언트 연결 확인
        console.log("socket connection succeeded.")
        
        // 단 하나의 채팅방
        const roomName = "메인룸";

        Object.keys(SOCKET_EVENT).forEach(typeKey => {
            const type = SOCKET_EVENT[typeKey];
          
            socket.on(type, requestData => {
                const isFirstVisit = type === SOCKET_EVENT.JOIN_ROOM;
            
                if (isFirstVisit) {
                    socket.join(roomName);
                }
                const responseData = {
                    ...requestData,
                    type,
                    time: new Date(),
                };
                socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
                console.log(`${type} is fired with data: ${JSON.stringify(responseData)}`);
            }); 
        });
    })
}