const TextList = (props) => {
    const items = props.gifs.map((itemData) => {
      return <Item url={itemData.url} gifstyle={itemData.animated_text_style} />;
    });
    return <div className="col-span-4 grid grid-cols-2 gap-y-8 xl:grid-cols-4">{items}</div>;
  };
  
  const Item = (props) => {
    return (
      <div className="gif-item lg:hover:shadow-lg">
        <img src={props.url} />
        <span className="text-md font-bold block pb-3">{props.gifstyle} style</span>
      </div>
    );
  };
  export default TextList;