function Keywords(props) {

  const { words } = props;

  return (
    <div className="keywords">
      {
        words.map((e, i) => {
          return <span>{e.found ? e.name : ""}</span>
        })
      }
    </div>
  );
}

export default Keywords;