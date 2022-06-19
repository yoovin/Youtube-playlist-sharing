import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player'

const PlayBar = (props) => {

    const [currentProgress, setCurrentProgress] = useState(0);
    const [volume, setVolume] = useState(0);
    const [play, setPlay] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=ikgEKP3tVqo");
    const player = useRef();

    useEffect(() => {

    },[])

    useEffect(() => {
        console.log("playid바뀜")
        props.playlist.map(item => {
            if(item.id == props.currentPlayId){
                setUrl(item.url)
                setTitle(item.title)
            }
        })
    },[props.currentPlayId])

    const onChangeBar = (e) => {
        // setCurrentProgress(e.target.value)
        // player.current.seekTo(parseFloat(e.target.value))
        props.socket.emit("change-duration", parseFloat(e.target.value))
    }

    const onMusicEnd = () => {

    }

    const onChangePlay = () => {
        if(play){
            props.socket.emit("play-event", false)
        }else{
            props.socket.emit("play-event", true)
        }
    }

    props.socket.on("change-duration", data => {
        player.current.seekTo(parseFloat(data))
        setCurrentProgress(parseFloat(data))
    })

    props.socket.on("play-event", data => {
        console.log(data)
        setPlay(data)
    })

    props.socket.on("change-url", data => {
        console.log(data)
        setUrl(data)
        player.current.seekTo(parseFloat(0))
    })


    return (
        <div className="play-bar-wrapper">
            <span className="current-title">현재 재생 중: {title}</span>
            <input 
            className="play-bar"
            value={currentProgress}
            onChange={e => onChangeBar(e)}
            min="0"
            max="1"
            step="any"
            type="range"/>

            <div className="on-off-button" onClick={() => onChangePlay()}></div>
            <input 
            className="volume-bar"
            value={volume}
            onChange={e => {
                setVolume(e.target.value)
                setIsMuted(false)
            }}
            min="0"
            max="1"
            step="any"
            type="range"/>

            <ReactPlayer 
            ref={player}
            className="player" 
            muted={isMuted}
            url={url} 
            width="0px"
            playing={play}
            volume={volume}
            onEnded={onMusicEnd}
            />
        </div>
    );
};

export default PlayBar;