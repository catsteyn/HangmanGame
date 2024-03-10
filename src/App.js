import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const words = ['JAVASCRIPT', 'DOM', 'HTML', 'CSS', 'REACT', 'NODEJS', 'API'];

const hangmanParts = [
  `
  ______
  |    |
  |
  |
  |
__|__
  `,
  `
  ______
  |    |
  |    O
  |
  |
__|__
  `,
  `
  ______
  |    |
  |    O
  |    |
  |
__|__
  `,
  `
  ______
  |    |
  |    O
  |   /|
  |
__|__
  `,
  `
  ______
  |    |
  |    O
  |   /|\\
  |
__|__
  `,
  `
  ______
  |    |
  |    O
  |   /|\\
  |   /
__|__
  `,
  `
  ______
  |    |
  |    O
  |   /|\\
  |   / \\
__|__
  `
];

const App = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedWord, setGuessedWord] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showCongratulationsPopup, setShowCongratulationsPopup] = useState(false);
  const [showOopsPopup, setShowOopsPopup] = useState(false);
  const [clickedKeys, setClickedKeys] = useState([]);

  useEffect(() => {
    selectWord();
  }, []);

  const updateHangmanArt = () => {
    return hangmanParts[incorrectGuesses];
  };

  const resetHangmanImage = () => {
    setIncorrectGuesses(0);
  };

  const selectWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(word);
    setGuessedWord(word.split('').map(() => '_'));
  };

  const displayWord = () => {
    return guessedWord.join(' ');
  };

  const checkLetter = useCallback((letter) => {
    let found = false;
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        guessedWord[i] = letter;
        found = true;
      }
    }
    if (!found) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
    return found;
  }, [selectedWord, guessedWord, incorrectGuesses]);

  const checkWordCompletion = useCallback(() => {
    return guessedWord.join('') === selectedWord;
  }, [guessedWord, selectedWord]);

  const handleGameOver = useCallback(() => {
    if (checkWordCompletion()) {
      setShowCongratulationsPopup(true);
    } else if (incorrectGuesses === hangmanParts.length - 1) {
      setShowOopsPopup(true);
    }
  }, [checkWordCompletion, incorrectGuesses]);

  const handleRestart = () => {
    selectWord();
    resetHangmanImage();
    setShowCongratulationsPopup(false);
    setShowOopsPopup(false);
    setClickedKeys([]);
  };

  const handleKeyClick = useCallback((id) => {
    const clickedKey = id.split('-')[0];
    setClickedKeys([...clickedKeys, clickedKey]);

    const guessedLetter = id.split('-')[0];
    if (!guessedWord.includes(guessedLetter)) {
      if (!checkLetter(guessedLetter)) {
        console.log('Incorrect guess');
      }
      setGuessedWord([...guessedWord]);
      handleGameOver();
    }
  }, [selectedWord, guessedWord, incorrectGuesses, clickedKeys, checkLetter, handleGameOver]);

  const KeyComponent = ({ id, letter }) => {
    return (
      <div
        id={id}
        className={`key ${guessedWord.includes(letter) || clickedKeys.includes(letter) ? 'clicked' : ''}`}
        onClick={() => handleKeyClick(id)}
      >
        {letter}
      </div>
    );
  };

  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const handleHelpClick = () => {
    setShowHelpPopup(true);
  };

  const handleHelpClose = () => {
    setShowHelpPopup(false);
  };

  return (
    <div className="container">
      <title>Hangman</title>
      <h1>Welcome to Hangman</h1>
      <div className="hangman">
        <pre id="hangman-art">{updateHangmanArt()}</pre>
      </div>
      <div className="word-container">
        <div className="word">{displayWord()}</div>
      </div>
      <div className="keyboard">
        {letters.map((letter, index) => (
          <KeyComponent
            key={`${letter}-${index}`}
            id={`${letter}-${index}`}
            letter={letter}
          />
        ))}
      </div>

      <button className="restart-btn" onClick={handleRestart}>
        Restart
      </button>
      <div className="help-btn-container">
        <button className="help-btn" onClick={handleHelpClick}>
          Help
        </button>
      </div>
      {showHelpPopup && (
        <div className="popup-container" id="help-popup-container">
          <div className="popup" id="help-popup">
            <h2>Help</h2>
            <p>Welcome to Hangman!</p>
            <p>Guess the word by selecting letters from the keyboard.</p>
            <p>You have a limited number of incorrect guesses before the game ends.</p>
            <p>Good luck!</p>
            <button className="close-btn" onClick={handleHelpClose}>
              Close
            </button>
          </div>
        </div>
      )}
      {showCongratulationsPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Congratulations!</h2>
            <p>You guessed the word correctly!</p>
            <button className="close-btn" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      )}
      {showOopsPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Oops!</h2>
            <p>Sorry, you didn't guess the word correctly.</p>
            <button className="close-btn" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
