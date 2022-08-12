import './App.css';
import axios from 'axios'
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import SearchList from './Components/SearchList';
import PlayList from './Components/PlayList';
import PlayBar from './Components/PlayBar';

const serverIP = process.env.REACT_APP_SERVER_ADDRESS
const socket = io.connect(serverIP)

function App() {

    const [playlist, setPlaylist] = useState([]);
    const [currentPlayId, setCurrentPlayId] = useState();

    useEffect(() => {
        axios.get(serverIP)
        .then((data) => {
            setCurrentPlayId(data.data.currentPlayId)
            data.data.playlist.map(item => {
                console.log(item)
                setPlaylist(state => state.concat(
                    {
                        id: item.id,
                        title: item.title, 
                        url: item.url, 
                        thumbnail: item.thumbnail
                    }
                ))
            })
        })
        socket.on("add-playlist", data => {
            setPlaylist(state => state.concat(
                {
                    id: data.id,
                    title: data.title, 
                    url: data.url, 
                    thumbnail: data.thumbnail
                }
            ))
        })
    
        socket.on("change-currentplayid", data => {
            setCurrentPlayId(data)
        })
    },[])

    return (
        <div className="App">
            <PlayList socket={socket} playlist={playlist} setPlaylist={setPlaylist} currentPlayId={currentPlayId}/>
            <SearchList socket={socket}/>
            <PlayBar socket={socket} playlist={playlist} currentPlayId={currentPlayId}/>
        </div>
    );
}

export default App;
