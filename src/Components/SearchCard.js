const SearchCard = (props) => {
    return (
        <div className="search-card">
            <img src={props.thumbnail} className="card-thumbnail"/>
            <span className="card-title">{props.title}</span>
        </div>
    );
};

export default SearchCard;