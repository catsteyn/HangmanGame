import React, { useState } from 'react';

const PopupContainer = () => {
  const [showHelp, setShowHelp] = useState(false);

  const showHelpPopup = () => {
    setShowHelp(true);
  };

  const hideHelpPopup = () => {
    setShowHelp(false);
  };

  return (
    <div>
      {/* Help Popup */}
      {showHelp && (
        <div className="popup-container" id="help-popup-container">
          <div className="popup" id="help-popup">
            <h2>Help</h2>
            <p>Welcome to Hangman!</p>
            <p>Guess the word by selecting letters from the keyboard.</p>
            <p>You have a limited number of incorrect guesses before the game ends.</p>
            <p>Good luck!</p>
            <button className="close-btn" onClick={hideHelpPopup}>Close</button>
          </div>
        </div>
      )}

      {/* Button to show Help Popup */}
      <div className="help-btn-container">
        <button className="help-btn" onClick={showHelpPopup}>Help</button>
      </div>
    </div>
  );
};

export default PopupContainer;
