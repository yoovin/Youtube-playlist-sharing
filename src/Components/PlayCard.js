import { useState } from 'react';

const PlayCard = (props) => {

    // const [isMouseEnter, setIsMouseEnter] = useState(false);
    return (
        <div 
        className={props.id == props.currentPlayId
                    ?"playlist-card selected"
                    :"playlist-card"}
        onClick={() => {
            props.socket.emit("change-currentplayid", props.id)
        }}
        // onMouseEnter={() => {setIsMouseEnter(true)}}
        // onMouseOut={() => {setIsMouseEnter(false)}}
        >
            <img src={props.thumbnail} className="card-thumbnail"/>
            <span className="card-title">{props.id} {props.title}</span>
            {/* {isMouseEnter ? <div className="playlist-card-button"
            ></div> : ""} */}
        </div>
    );
};

export default PlayCard;