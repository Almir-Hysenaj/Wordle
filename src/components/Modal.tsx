interface ModalProps {
  isCorrect: boolean;
  turn: number;
  solution: string;
}

const Modal: React.FC<ModalProps> = ({ isCorrect, turn, solution }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] fixed w-full h-full top-0 left-0">
      {isCorrect && (
        <div className="max-w-120 bg-white p-10 rounded-[10px] my-[10%] mx-auto shadow-md">
          <h1 className="font-bold pb-7">You Win!</h1>
          <p className="text-rose-500 pb-5">{solution}</p>
          <p>You found the solution in {turn} turn(s)</p>
        </div>
      )}
      {!isCorrect && (
        <div className="max-w-120 bg-white p-10 rounded-[10px] my-[10%] mx-auto shadow-md">
          <h1 className="font-bold pb-7">Nevermind...</h1>
          <p className="text-rose-500 pb-5">{solution}</p>
          <p>Better luck next time</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
