import { useEffect, useState } from "react";

function App() {
  const [number1, setNumber1] = useState(generateRandomNumber());
  const [number2, setNumber2] = useState(generateRandomNumber());
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setIsGameOver(true);
    }
  }, [timer]);

  function handleSelection() {
    if (number2 === number1) return;

    if (number1 > number2) {
      setScore(function (score) {
        return score + 1;
      });
    }
    setNumber1(generateRandomNumber());
    setNumber2(generateRandomNumber());
  }

  function handleSelectionNumber2() {
    if (number1 === number2) return;
    if (number2 > number1) {
      setScore(function (score) {
        return score + 1;
      });
    }
    setNumber2(generateRandomNumber());
    setNumber1(generateRandomNumber());
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  return (
    <div className="scoreboard container">
      {isGameOver ? (
        <>
          <h1 className="heading-primary">Game Over</h1>
        </>
      ) : (
        <>
          <GameTimer timer={timer} isGameOver={isGameOver} />
          <NumberGenerator
            onSelection={handleSelection}
            onSelectionNumber2={handleSelectionNumber2}
            number1={number1}
            number2={number2}
            score={score}
            isGameOver={isGameOver}
          />
        </>
      )}
      <Score score={score} />
    </div>
  );
}

function GameTimer({ timer }) {
  return (
    <div className="scoreboard container">
      <h2 className="heading-secondary">Time Left: {timer}</h2>
      <h1 className="heading-primary">Press The Greater Value</h1>
    </div>
  );
}

function NumberGenerator({
  number1,
  number2,
  onSelection,
  onSelectionNumber2,
}) {
  return (
    <div className="button-center">
      <Button onClick={onSelection}>{number1}</Button>
      <Button onClick={onSelectionNumber2}>{number2}</Button>
    </div>
  );
}

function Score({ score }) {
  return (
    <div>
      <p className="score">
        <span className="red"> Your Score: </span>
        <span className="green">{score}</span>
      </p>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
