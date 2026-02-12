interface KeypadProps {
  usedKeys: Record<string, string>;
  addLetter: (letter: string) => void;
  deleteLetter: () => void;
  submitGuess: () => void;
}

const lettersArray = 'abcdefghijklmnopqrstuvwxyz'
  .split('')
  .map((key) => ({ key }));

const colorMap: Record<string, string> = {
  green: 'bg-[#5ac85a] border-[#5ac85a] text-white',
  yellow: 'bg-[#e2cc68] border-[#e2cc68] text-white',
  grey: 'bg-[#a1a1a1] border-[#a1a1a1] text-white',
};

const baseTileClass =
  'm-1 w-10 h-12.5 inline-flex items-center justify-center rounded-md cursor-pointer';

const Keypad: React.FC<KeypadProps> = ({
  usedKeys,
  addLetter,
  deleteLetter,
  submitGuess,
}) => {
  return (
    <div className="max-w-125 mx-auto my-5 flex flex-wrap justify-center">
      {lettersArray.map((letter) => {
        const keyColorClass = usedKeys[letter.key]
          ? colorMap[usedKeys[letter.key]!]
          : 'bg-gray-200 border-gray-300 text-black hover:bg-gray-300';

        return (
          <div
            key={letter.key}
            className={`${baseTileClass} ${keyColorClass}`}
            onClick={() => addLetter(letter.key)}
          >
            {letter.key}
          </div>
        );
      })}
      {/* Backspace */}
      <button
        onClick={deleteLetter}
        className={`${baseTileClass} w-20 bg-gray-200 border-gray-300 text-black hover:bg-gray-300`}
      >
        Delete
      </button>
      {/* Enter */}
      <button
        onClick={submitGuess}
        className={`${baseTileClass} w-20 bg-gray-200 border-gray-300 text-black hover:bg-gray-300`}
      >
        Enter
      </button>
    </div>
  );
};

export default Keypad;
