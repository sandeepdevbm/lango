const io = require('socket.io')(8800, {
    cors: {
        orgin: 'http://localhost:5173'
    }
})

let activeUsers = []
io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("Connected Users", activeUsers);
        io.emit('get-users', activeUsers)
    })

    // send message
    socket.on("send-message", (data) => {
        const { receiverId } = data
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("Sending from socket to : ", receiverId);
        console.log(data, "data");
        if (user) {
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    //     // Handle typing status
    //   socket.on('typing-status', (isTyping) => {
    //     // Broadcast the typing status to all connected clients
    //     io.emit('typing-status', isTyping);
    //   });

    // Handle typing status
    socket.on('typing-status', ({ isTyping, receiverId, senderId }) => {
        console.log(receiverId,"receiverIdddddd");
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log(user,"uerrrr");
        // Broadcast the typing status to the selected person only
        if (user) {
        io.to(user.socketId).emit('typing-status', { isTyping, senderId });
        // io.to(receiverId).emit('typing-status', { isTyping, receiverId });
            console.log(senderId,"senderId");
        }
    }); 

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("User Disconnected", activeUsers);
        io.emit('get-users', activeUsers)
    })
})
