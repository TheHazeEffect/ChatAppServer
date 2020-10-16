const app = require('express')()
const http = require('http').createServer(app)
port = process.env.PORT || 8080
app.get('/', (req, res) => {
    res.send("Node Server is running, Yay!!")
})

//socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("Send message", (data => {
        userSocket.broadcast.emit("recieve message", data)
    }))
})


http.listen(port);