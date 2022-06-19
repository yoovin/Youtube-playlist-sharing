import axios from 'axios'
import { useState } from 'react';
import SearchCard from './SearchCard';

const apiKey = process.env.REACT_APP_API_KEY

const SearchList = () => {
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
        maxResults:2,
        regionCode:"KR",
        type: "video"
    }

    return (
        <div className="search-list" onClick={() => console.log(searchList)}>
            <input 
                className="search-input"
                placeholder="검색"
                value = {searchWord}
                onFocus={() => {setFocused(true)}}
                onBlur={() => {setFocused(false)}}
                onChange={e => {setSearchWord(e.target.value)}}
            ></input>
            {/* <div className="search-button-selected" onClick={() => {getSearchList(optionParams)}}></div> */}
            <div className="search-card-list">
                {searchList.map((data) => (<SearchCard 
                thumbnail={data.snippet.thumbnails.default.url} 
                title={data.snippet.title}
                />))}
            </div>
            {focused ? <div className="search-button-selected" onClick={() => {getSearchList(optionParams)}}></div> : <div className="search-button"></div>}
            
        </div>
    );
};


export default SearchList;
