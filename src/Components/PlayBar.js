import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import {faPlay, faPause, faVideo, faVideoSlash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PlayBar = (props) => {

    const [currentProgress, setCurrentProgress] = useState(0)
    const [volume, setVolume] = useState(0)
    const [play, setPlay] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=ikgEKP3tVqo")
    const [isVideoVisible, setIsVideoVisible] = useState(false)
    const player = useRef()

    useEffect(() => {
        props.playlist.map(item => {
            if(item.id == props.currentPlayId){
                setUrl(item.url)
                setTitle(item.title)
            }
        })
    },[props.currentPlayId])

    const onChangeBar = (e) => {
        props.socket.emit("change-duration", parseFloat(e.target.value))
    }

    const onMusicEnd = () => {
        if(props.currentPlayId == props.playlist[props.playlist.length - 1].id){ // 플레이리스트 마지막곡이면 처음으로 돌아감
            props.socket.emit("change-currentplayid", props.playlist[0].id)
        }else{
            props.socket.emit("change-currentplayid", props.currentPlayId + 1)
        }
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
        setPlay(data)
    })

    props.socket.on("change-url", data => {
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
            <FontAwesomeIcon className="on-off-button" icon={play? faPause: faPlay} onClick={() => onChangePlay()} />
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
            <FontAwesomeIcon className="video-button" icon={isVideoVisible? faVideoSlash: faVideo} 
            onClick={() => {
                isVideoVisible
                ? setIsVideoVisible(false)
                : setIsVideoVisible(true)
            }} />
            <div className="player">
                <ReactPlayer 
                ref={player}
                className="player"
                muted={isMuted}
                url={url}
                width={
                    isVideoVisible
                    ? "100%"
                    : "0px"
                }
                playing={play}
                volume={volume}
                onEnded={onMusicEnd}
                />
            </div>
            
        </div>
    );
};

export default PlayBar