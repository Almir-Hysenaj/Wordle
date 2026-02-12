import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null);

  // Get a random 5 letter word from API
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch(
          'https://words.dev-apis.com/word-of-the-day?random=1',
        );
        const data = await response.json();
        setSolution(data.word.toLowerCase());
      } catch (err) {
        console.log('Failed to fetch word', err);
      }
    };

    fetchWord();
  }, [setSolution]);

  console.log(solution);

  return (
    <div className="text-center m-0 font-[verdana]">
      <h1 className="text-2xl py-5 px-0 mb-7.5 border-b border-[#eee] font-semibold">
        Wordle
      </h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
