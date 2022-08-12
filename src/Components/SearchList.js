import axios from 'axios'
import { useState } from 'react';
import SearchCard from './SearchCard';

const apiKey = process.env.REACT_APP_API_KEY

const SearchList = (props) => {
    const [focused, setFocused] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [searchList, setSearchList] = useState([]);

    const getSearchList = (param) => {
        axios.get("https://www.googleapis.com/youtube/v3/search?",{
            params: param
        })
        .then(({data}) => {
            setSearchList(data.items)
        })
    }

    let optionParams = {
        q: searchWord,
        part: "snippet",
        key: apiKey,
        maxResults:5,
        regionCode:"KR",
        type: "video"
    }

    return (
        <div className="search-list">
            <input 
                className="search-input"
                placeholder="검색"
                value = {searchWord}
                onFocus={() => {setFocused(true)}}
                onBlur={() => {setFocused(false)}}
                onChange={e => {setSearchWord(e.target.value)}}
            ></input>
            <div className="search-button-selected" onClick={() => {getSearchList(optionParams)}}>검색</div>
            <div className="search-card-list">
                {searchList.map((data) => (<SearchCard 
                id={data.id.videoId}
                thumbnail={data.snippet.thumbnails.default.url} 
                title={data.snippet.title}
                socket={props.socket}
                />))}
            </div>
        </div>
    );
};


export default SearchList;
