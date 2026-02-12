import { useState } from 'react';

interface Guess {
  key: string;
  color: string;
}

const useWordle = (solution: string | null) => {
  // Required states
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<Guess[][]>([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<Record<string, string>>({});

  const formatGuess = () => {
    if (!solution) return [];
    const solutionArray: (string | null)[] = [...solution];
    const formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: 'grey' };
    });

    // Green matches
    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        formattedGuess[index].color = 'green';
        solutionArray[index] = null;
      }
    });

    // Yellow matches
    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[index].color = 'yellow';
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formatted: Guess[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((previous) => {
      const newGuesses = [...previous];
      newGuesses[turn] = formatted;
      return newGuesses;
    });

    setHistory((previous) => {
      return [...previous, currentGuess];
    });

    setTurn((previous) => {
      return previous + 1;
    });

    setUsedKeys((previous) => {
      const newKeys = { ...previous };
      formatted.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === 'green') {
          newKeys[letter.key] = 'green';
          return;
        }
        if (letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow';
          return;
        }
        if (
          letter.color === 'grey' &&
          currentColor !== 'green' &&
          currentColor !== 'yellow'
        ) {
          newKeys[letter.key] = 'grey';
          return;
        }
      });
      return newKeys;
    });

    setCurrentGuess('');
  };

  const handleKeyup = ({ key }: KeyboardEvent) => {
    // Handles user clicking Enter button
    if (key === 'Enter') {
      // Only add guess if:
      // Turn < 5
      if (turn > 5) {
        console.log('All guesses used!');
        return;
      }
      // No dupe words
      if (history.includes(currentGuess)) {
        console.log('Word already used!');
        return;
      }
      // Word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log("Word isn't long enough!");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    // If Backspace is clicked, remove last letter form currentGuess
    if (key === 'Backspace') {
      setCurrentGuess((previous) => {
        return previous.slice(0, -1);
      });
      return;
    }

    // Only add letter to currentGuess if length < 5 & letter A-Z|a-z
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((previous) => {
          return previous + key;
        });
      }
    }
  };

  const addLetter = (letter: string) => {
    if (/^[A-za-z]$/.test(letter) && currentGuess.length < 5) {
      setCurrentGuess((previous) => previous + letter.toLowerCase());
    }
  };

  const deleteLetter = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const submitGuess = () => {
    if (turn > 5) return;
    if (history.includes(currentGuess)) return;
    if (currentGuess.length !== 5) return;

    const formatted = formatGuess();
    addNewGuess(formatted);
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    addLetter,
    deleteLetter,
    submitGuess,
  };
};

export default useWordle;
