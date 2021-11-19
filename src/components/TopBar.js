import { VscDebugRestart } from 'react-icons/vsc';
import { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";

function TopBar(props) {

  const { words, setWords } = props

  const countdownRef = useRef();

  const [guess        , setGuess        ] = useState('');
  const [score        , setScore        ] = useState(0);
  const [gameRunning  , setGameRunning  ] = useState(false);
  const [gameFinished , setGameFinished ] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(Date.now() + 60 * 1000 * 5);

  const checkGuess = () => {
    const copy = words.map((e) => {
      if (guess === e.name && !e.found) {
        e.found = true;
        setGuess('');
        setScore(prev => prev + 1);
      }

      return e;
    });

    setWords(copy);
  }

  const startGame = () => {
    setGameRunning(true);
    setGameFinished(false);
    countdownRef.current.getApi().start();
  }

  const endGame = () => {
    setGameRunning(false);
    setGameFinished(true);
  }

  const restartGame = () => {
    const copy = words;

    words.forEach((e) => {
      e.found = false;
    })

    setWords([...copy]);

    setScore(0);
    startGame();
  }

  const customRenderer = ({ minutes, seconds }) => {
    return <span>{`${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`}</span>
  }

  useEffect(() => {
    checkGuess();
  }, [guess]);

  return (
    <div className="top-bar">
      <div className="control">
        <h2>Can you name the Java keywords?</h2>
        <div className="control-content">
          {
            (!gameRunning && !gameFinished) && <button onClick={() => startGame()}>Start</button>
          }
          {
            (gameRunning && !gameFinished) && (
              <input
                type="text"
                placeholder="Input your guess..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
            )
          }
          {
            gameFinished && (
              <div className="post-game">
                <div>YOUR SCORE: {`${Math.trunc(100 * score / words.length)}%`}</div>
                <button
                  onClick={() => restartGame()}
                  style={{ padding: '0.4rem', display: 'flex', borderRadius: '50px' }}
                >
                  <VscDebugRestart />
                </button>
              </div>
            )
          }
        </div>
      </div>
      <div className="info">
        <span>{`${score}/${words.length}`}</span>
        <Countdown
          date={timeRemaining}
          autoStart={false}
          renderer={customRenderer}
          ref={countdownRef}
          onComplete={() => endGame()}
          onStart={() => { setTimeRemaining(Date.now() + 60 * 1000 * 5) }}
        />
      </div>
    </div>
  );
}

export default TopBar;