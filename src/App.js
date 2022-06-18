import './App.css';
import axios from 'axios'
import ReactPlayer from 'react-player'
import SearchList from './Components/SearchList';



function App() {
  return (
    <div className="App">
        <div className="play-list">플레이리스트</div>
        <SearchList/>
        <div className="play-bar">
        </div>
        <ReactPlayer/>
    </div>
  );
}

export default App;
