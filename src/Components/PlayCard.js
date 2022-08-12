

const PlayCard = (props) => {
    return (
        <div 
        className={props.id == props.currentPlayId
                    ?"playlist-card selected"
                    :"playlist-card"}
        onClick={() => {
            props.socket.emit("change-currentplayid", props.id)
        }}
        >
            <img src={props.thumbnail} className="card-thumbnail"/>
            <span className="card-title">{props.id} {props.title}</span>
        </div>
    );
};

export default PlayCard;