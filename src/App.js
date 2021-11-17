import { useState } from 'react';
import Keywords from './components/Keywords';
import TopBar from './components/TopBar';
import keywords from './data/keywords';

function App() {

  const [words, setWords] = useState(keywords);

  return (
    <div className="App">
      <TopBar words={words} setWords={setWords} />
      <Keywords words={words} />
    </div>
  );
}

export default App;
