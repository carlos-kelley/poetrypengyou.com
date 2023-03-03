import { useDispatch } from "react-redux";

function EnglishPageContent({ allReset, poem }) {
  const dispatch = useDispatch();

  function handleClick() {
    allReset();
    dispatch({ type: "UNSET_WORD" });
  }

  return (
    <div
      className="englishInfoContainer"
      onClick={() => {
        console.log(
          "englishInfoContainer clicked"
        );
        handleClick();
      }}
    >
      {poem[0] && (
        <h3
          className="englishTitleClass"
          onClick={handleClick}
        >
          {poem[0].title_english}
        </h3>
      )}
      {poem[0] && (
        <h3
          className="englishAuthorClass"
          onClick={handleClick}
        >
          {poem[0].author_english}
        </h3>
      )}
      {poem[0] && (
        <p
          className="englishPoemClass"
          onClick={handleClick}
        >
          {poem[0].poem_english}
        </p>
      )}
    </div>
  );
}

export default EnglishPageContent;
