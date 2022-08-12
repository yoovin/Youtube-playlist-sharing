const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

app.use(cors())

let playlist = [
    {
        id: 1,
        thumbnail: "https://i.ytimg.com/vi/Ksf_gq6fZZM/default.jpg",
        title: "【YouTube限定公開】コットンキャンディえいえいおー！ Special MV",
        url: "https://www.youtube.com/watch?v=Ksf_gq6fZZM"
    },
]
let id = 2
let currentPlayId = 1
let currentDuration = 0



app.get('/', function (req, res) {
    const currentState = {
        playlist: playlist,
        isPlay: false,
        url: playlist[currentPlayId],
        currentDuration: currentDuration,
        currentPlayId: currentPlayId,
    }
    res.send(currentState)
    })

io.on('connection', socket => {
    socket.on('play-event', socket => {
        io.emit("play-event", socket)
    })

    socket.on("add-playlist", data => {
        let newThing = {
            ...data,
            id: id
        }
        playlist = [...playlist, newThing]
        io.emit("add-playlist", newThing)
        console.log(newThing)
        id++
    })

    socket.on("change-duration", socket => {
        console.log(socket)
        currentDuration = socket
        io.emit("change-duration", socket)
    })

    socket.on("change-url", socket => {
        console.log(socket)
        io.emit("change-url", socket)
    })

    socket.on("change-currentplayid", socket => {
        console.log(socket)
        currentPlayId = socket
        io.emit("change-currentplayid", socket)
        io.emit("change-duration", 0)
    })
})


server.listen(3001, function () {
    console.log(`application is listening on port ${3001}...`)
})