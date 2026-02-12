import Row from './Row';

interface Guess {
  key: string;
  color: string;
}

interface GridProps {
  currentGuess: string;
  guesses: Guess[][];
  turn: number;
}

const Grid: React.FC<GridProps> = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((guess, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
};

export default Grid;
