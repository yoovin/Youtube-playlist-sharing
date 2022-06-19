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
        thumbnail: "https://i.ytimg.com/vi/c0v_JEF_Jqs/default.jpg",
        title: "🌺Beautiful Japan Songs 2020🍒春茶 🍑Lefty Hand Cream🌺こぴ 🍊美しい日本の音楽 メドレー 🌿ラブソング 邦楽 メドレー 🌻",
        url: "https://www.youtube.com/watch?v=c0v_JEF_Jqs"
    }, 
    {
        id: 2,
        thumbnail: "https://i.ytimg.com/vi/QZcYz2NrDIs/default.jpg",
        title: "React 입문자들이 알아야할 Redux 쉽게설명 (8분컷)",
        url: "https://www.youtube.com/watch?v=QZcYz2NrDIs"
    },
    {
        id: 3,
        thumbnail: "https://i.ytimg.com/vi/Sw1Flgub9s8/default.jpg",
        title: "ヨルシカ - 春泥棒（OFFICIAL VIDEO）",
        url: "https://www.youtube.com/watch?v=Sw1Flgub9s8",
    }
]
let id = 4
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
    console.log(playlist)
    })

io.on('connection', socket => {
    socket.on('play-event', socket => {
        io.emit("play-event", socket)
    })

    socket.on("add-playlist", socket => {
        let newThing = {
            ...socket,
            id: id
        }
        playlist = [...playlist, newThing]
        console.log(newThing)
        io.emit("add-playlist", newThing)
        id++
    })

    socket.on("change-duration", socket => {
        console.log(socket)
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