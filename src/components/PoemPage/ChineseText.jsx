function ChineseText(props) {
  const { characters, clickedIndex, onClick } =
    props;

  return (
    <h3 className="chineseText">
      {characters.map((character, index) => (
        <span
          key={index}
          onClick={() => onClick(index)}
          style={{
            background:
              clickedIndex === index
                ? "lightblue"
                : null,
          }}
        >
          {character}
        </span>
      ))}
    </h3>
  );
}

export default ChineseText;