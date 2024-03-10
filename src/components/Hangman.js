import React from 'react';

function Hangman({ hangmanArt }) {
  return (
    <div className="hangman">
      <pre id="hangman-art">{hangmanArt}</pre>
    </div>
  );
}

export default Hangman;
