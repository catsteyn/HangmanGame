import React from 'react';

const WordContainer = ({ selectedWord, guessedWord }) => {
  const displayWord = () => {
    const word = [];
    for (let i = 0; i < selectedWord.length; i++) {
      const letter = guessedWord[i] ? guessedWord[i] : '_';
      word.push(letter);
    }
    return word.join(' ');
  };

  return (
    <div className="word-container">
      <div className="word">{displayWord()}</div>
    </div>
  );
};

export default WordContainer;
