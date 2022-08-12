import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY

const SearchCard = (props) => {

    const getInfoFromUrl = (param) => {
        axios.get("https://www.googleapis.com/youtube/v3/videos?",{
            params: param
        })
        .then(({data}) => {
            let item = data.items[0].snippet
            props.socket.emit("add-playlist", {
                        title:item.title,
                        url:"https://www.youtube.com/watch?v=" + data.items[0].id,
                        thumbnail:item.thumbnails.default.url
            })
        })
    }

    let optionParams = {
        id:props.id,
        part: "snippet",
        key: apiKey,
        regionCode:"KR",
    }

    return (
        <div className="search-card">
            <img src={props.thumbnail} className="card-thumbnail"/>
            <span className="card-title"
            onClick={() => getInfoFromUrl(optionParams)}>{props.title}</span>
        </div>
    );
};

export default SearchCard;