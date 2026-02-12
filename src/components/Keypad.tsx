interface KeypadProps {
  usedKeys: Record<string, string>;
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
  'm-1 w-10 h-12.5 inline-flex items-center justify-center rounded-md';

const Keypad: React.FC<KeypadProps> = ({ usedKeys }) => {
  return (
    <div className="max-w-125 mx-auto my-5 flex flex-wrap justify-center">
      {lettersArray.map((letter) => {
        const keyColorClass = usedKeys[letter.key]
          ? colorMap[usedKeys[letter.key]!]
          : 'bg-gray-200 border-gray-300 text-black';

        return (
          <div key={letter.key} className={`${baseTileClass} ${keyColorClass}`}>
            {letter.key}
          </div>
        );
      })}
    </div>
  );
};

export default Keypad;
