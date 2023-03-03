import { useHistory } from "react-router-dom";

function PoemItem({ poem }) {
  const history = useHistory();

  const goToPoem = (poemNumber) => {
    history.push(`/poem/${poemNumber}`);
  };

  return (
    <li
      key={poem.id}
      className="poemListItem"
      onClick={() => {
        goToPoem(poem.number);
      }}
    >
      {poem.number} &nbsp;
      {poem.author_simplified}《
      {poem.title_simplified}》
      <br />
      {poem.author_english} &nbsp; "
      {poem.title_english}"
    </li>
  );
}

export default PoemItem;
