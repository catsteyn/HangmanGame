import React, { useState, useEffect } from 'react';
import Hangman from './Hangman';
import Help from './Help'; // Import the Help component
import Keyboard from './Keyboard'; // Import Keyboard component
import PopupContainer from './PopupContainer'; // Import the Popup Container component
import RestartButton from './RestartButton'; // Import the RestartButton component
import WordContainer from './WordContainer'; // Import the WordContainer component

function HangmanGame() {
  const initialHangmanParts = [];
  const initialGameState = {
    hangmanParts: initialHangmanParts,
    selectedWord: '',
    guessedWord: [],
    incorrectGuesses: 0,
    showCongratulationsPopup: false,
    showOopsPopup: false,
    isHelpPopupVisible: false,
  };

  const [gameState, setGameState] = useState(initialGameState);

  useEffect(() => {
    initializeGame();
  }, []); // Run only once when the component mounts

  const words = ['JAVASCRIPT', 'DOM', 'HTML', 'CSS', 'REACT', 'NODEJS', 'API'];

  const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const initializeGame = () => {
    const word = getRandomWord();
    setGameState((prevState) => ({
      ...prevState,
      selectedWord: word,
      guessedWord: Array(word.length).fill('_'),
      incorrectGuesses: 0,
      showCongratulationsPopup: false,
      showOopsPopup: false,
    }));
  };

  // Handle keyboard key press
  const handleKeyPress = (letter) => {
    const { selectedWord, guessedWord, incorrectGuesses } = gameState;
    const newGuessedWord = [...guessedWord];
    let newIncorrectGuesses = incorrectGuesses;

    // Check if letter is in the selected word
    let letterFound = false;
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        newGuessedWord[i] = letter;
        letterFound = true;
      }
    }

    // If letter is not found, increment incorrect guesses
    if (!letterFound) {
      newIncorrectGuesses++;
      if (newIncorrectGuesses === hangmanParts.length - 1) {
        setTimeout(() => {
          setGameState(prevState => ({
            ...prevState,
            showOopsPopup: true
          }));
        }, 1000); // Delay showing the popup by 1 second
      }
    }
    

    // Update game state
    setGameState((prevState) => ({
      ...prevState,
      guessedWord: newGuessedWord,
      incorrectGuesses: newIncorrectGuesses,
    }));

    // Check for game completion or failure
    if (letterFound) {
      checkWordCompletion(newGuessedWord.join(''), selectedWord);
    } else {
      checkFailure(newIncorrectGuesses);
    }
  };

  // Check if the word is completed
  const checkWordCompletion = (guessedWord, selectedWord) => {
    if (guessedWord === selectedWord) {
      setGameState((prevState) => ({
        ...prevState,
        showCongratulationsPopup: true,
      }));
    }
  };

  // Check for game failure
  const checkFailure = (incorrectGuesses) => {
    const { hangmanParts } = gameState;
    if (incorrectGuesses === hangmanParts.length - 1) {
      setGameState((prevState) => ({
        ...prevState,
        showOopsPopup: true,
      }));
    }
  };

  // Show the Help popup
  const showHelpPopup = () => {
    setGameState((prevState) => ({ ...prevState, isHelpPopupVisible: true }));
  };

  // Hide the Help popup
  const hideHelpPopup = () => {
    setGameState((prevState) => ({ ...prevState, isHelpPopupVisible: false }));
  };

  // Destructure gameState for easier access
  const { hangmanParts, showCongratulationsPopup, showOopsPopup } = gameState;

  // Render method
  return (
    <div className="container">
      {/* Render Hangman component */}
      <Hangman hangmanArt={hangmanParts[gameState.incorrectGuesses]} />
      {/* Render Word container */}
      <WordContainer selectedWord={gameState.selectedWord} guessedWord={gameState.guessedWord} />
      {/* Render Keyboard component */}
      <Keyboard onClick={handleKeyPress} />
      {/* Render RestartButton component */}
      <RestartButton onClick={initializeGame} />
      {/* Render Congratulations and Oops popups */}
      {showCongratulationsPopup && (
        <PopupContainer type="congratulations" onClose={() => setGameState((prevState) => ({ ...prevState, showCongratulationsPopup: false }))} />
      )}
      {showOopsPopup && (
        <PopupContainer type="oops" onClose={() => setGameState((prevState) => ({ ...prevState, showOopsPopup: false }))} />
      )}
      {/* Render Help component */}
      <Help showHelp={showHelpPopup} onClose={hideHelpPopup} />
    </div>
  );
}

export default HangmanGame;
