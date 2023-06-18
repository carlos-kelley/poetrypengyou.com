import React from "react";
import { ReactComponent as FontDownloadIcon } from "./font_download.svg";
import { ReactComponent as FontDownloadOffIcon } from "./font_download_off.svg";
import "./EnglishPage.css";

function EnglishPageToggleButton({
  isOn,
  onClick,
}) {
  const Icon = isOn
    ? FontDownloadIcon
    : FontDownloadOffIcon;
  return (
    <Icon
      className="englishButton"
      onClick={onClick}
    />
  );
}

export default EnglishPageToggleButton;
