const app = require('express')()
const http = require('http').createServer(app)
port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Node Server is running, Yay!!")
})

//socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data => {
        console.log(data["message"]);
        userSocket.broadcast.emit("recieve_message", data)
    }))
})


http.listen(port);