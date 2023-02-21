import { useHistory } from "react-router-dom";
import { ReactComponent as BackButtonIcon } from "./arrow_back.svg";
import "./BackButton.css";

// This is the BackButton component. It is a button that takes the user back to the poem select page.
function BackButton(props) {
  const history = useHistory();

  function pushBack() {
    history.push(`/poemselect`);
  }

  return (
    <div>
      <BackButtonIcon
        className="backButton"
        onClick={pushBack}
      />
    </div>
  );
}

export default BackButton;
