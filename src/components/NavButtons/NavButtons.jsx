import React from 'react';
import LastButton from '../LastButton/LastButton';
import NextButton from '../NextButton/NextButton';
import './NavButtons.css';

function NavButtons(props) {
  return (
      <div className = "navContainer">
        <LastButton />
        <NextButton />
    </div>
  );
}

export default NavButtons;