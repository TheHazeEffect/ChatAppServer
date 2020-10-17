const app = require('express')()
const http = require('http').createServer(app)
const ss = require('socket.io-stream');
const stream = ss.createStream();

const fs = require('fs')

const AudioArray = [
    'Audio1',
    'Audio2',
    'Audio3',
    'Audio4'
]
let index = 0;


void function nextTrack() {
    index++;
    if (index > AudioArray.length - 1)
        index = 0;

}

void function prevTrack() {
    index--;
    if (index < 0)
        index = AudioArray.length - 1
}

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    console.log("pinged");



    const filePath = __dirname + `/audiofiles/${AudioArray[index]}.mp4`
    console.log(filePath)
    stat = fs.statSync(filePath)


    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    // We replaced all the event handlers with a simple call to util.pump()
    fs.createReadStream(filePath).pipe(res);

})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {

    userSocket.on("next_track", (data) => {
        console.log(data["message"]);
        nextTrack()
        socketio.emit("track_changed", data)
    })

    userSocket.on("prev_track", (data) => {
        console.log(data["message"]);
        prevTrack()

        socketio.emit("track_changed", data)
    })


})

http.listen(port, () => console.log(`listening on port ${port}`))

