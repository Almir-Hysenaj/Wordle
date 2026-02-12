interface Guess {
  key: string;
  color: string;
}

interface RowProps {
  guess?: Guess[];
  currentGuess?: string;
}

const colorMap: Record<string, string> = {
  green: 'bg-[#5ac85a] border-[#5ac85a] text-white',
  yellow: 'bg-[#e2cc68] border-[#e2cc68] text-white',
  grey: 'bg-[#a1a1a1] border-[#a1a1a1] text-white',
};

const baseTileClass =
  'block w-15 h-15 border border-[#bbb] m-1 text-center leading-15 uppercase font-bold text-[2.5em]';

const Row: React.FC<RowProps> = ({ guess, currentGuess }) => {
  // Previous guesses
  if (guess) {
    return (
      <div className="text-center flex justify-center">
        {guess.map((letter, index) => {
          return (
            <div
              key={index}
              className={`${colorMap[letter.color]} ${baseTileClass}`}
            >
              {letter.key}
            </div>
          );
        })}
      </div>
    );
  }

  // Current guess
  if (currentGuess) {
    const letters = currentGuess.split('');

    return (
      <div className="text-center flex justify-center">
        {letters.map((letter, index) => {
          return (
            <div key={index} className={`${baseTileClass}`}>
              {letter}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((_, index) => {
          return <div className={`${baseTileClass}`} key={index}></div>;
        })}
      </div>
    );
  }

  // Remaining guesses
  return (
    <div className="text-center flex justify-center">
      <div className={`${baseTileClass}`}></div>
      <div className={`${baseTileClass}`}></div>
      <div className={`${baseTileClass}`}></div>
      <div className={`${baseTileClass}`}></div>
      <div className={`${baseTileClass}`}></div>
    </div>
  );
};

export default Row;
