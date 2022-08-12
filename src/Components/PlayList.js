import axios from 'axios'
import { useState } from 'react';
import PlayCard from "./PlayCard"

const apiKey = process.env.REACT_APP_API_KEY

const PlayList = (props) => {

    const [searchWord, setSearchWord] = useState("");

    const getInfoFromUrl = (param) => {
        if (param.id === undefined) return
        param.id = param.id.substring(0, 11)
        axios.get("https://www.googleapis.com/youtube/v3/videos?",{
            params: param
        })
        .then(({data}) => {
            setSearchWord("")
            let item = data.items[0].snippet
            props.socket.emit("add-playlist", {
                        title:item.title,
                        url:"https://www.youtube.com/watch?v=" + data.items[0].id,
                        thumbnail:item.thumbnails.default.url
            })
        })
    }

    let optionParams = {
        id:
        searchWord.includes("v=")?
        searchWord.split("v=")[1]:
        searchWord.split("/")[3],
        part: "snippet",
        key: apiKey,
        regionCode:"KR",
    }
    

    return (
        <div className="playlist">
            <input className="playlist-input"
                value = {searchWord}
                placeholder="유튜브 링크"
                onChange={e => {setSearchWord(e.target.value)}}
            />
            <div className="playlist-button"
                onClick={() => getInfoFromUrl(optionParams)}>추가</div>
            <div className="playlist-card-list">
                {props.playlist.map(({url, thumbnail, title, id}) => (<PlayCard title={title} url={url} thumbnail={thumbnail} id={id} socket={props.socket} currentPlayId={props.currentPlayId}/>))}
            </div>
        </div>
    );
};

export default PlayList;