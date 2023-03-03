import { useHistory } from "react-router-dom";
import { ReactComponent as BackButtonSvg } from "./arrow_back.svg";
import "./BackButton.css";

function BackButton(props) {
  const history = useHistory();

  const handleBackButtonClick = () => {
    history.push(`/poemselect`);
  };

  return (
    <BackButtonSvg
      className="backButton"
      onClick={handleBackButtonClick}
    />
  );
}

export default BackButton;
