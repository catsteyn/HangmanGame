import React from 'react';

const Keyboard = ({ onClick }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="keyboard">
      {alphabet.map((letter, index) => (
        <div key={index} className="key" onClick={() => onClick(letter)}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
