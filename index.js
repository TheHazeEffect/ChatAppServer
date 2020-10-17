const app = require('express')()
const http = require('http').createServer(app)
const ss = require('socket.io-stream');
const stream = ss.createStream();

const fs = require('fs')
const filePath = __dirname + '\\audiofiles\\Audio1.mp4'
console.log(filePath)

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {

    userSocket.on("play_music", (data) => {
        console.log("ping")
        console.log(data["message"]);

        ss(userSocket).emit("listen_music", stream);
        // userSocket.broadcast.emit("listen_music", data)
        fs.createReadStream(filePath).pipe(stream);

    })
})

http.listen(port, () => console.log(`listening on port ${port}`))

