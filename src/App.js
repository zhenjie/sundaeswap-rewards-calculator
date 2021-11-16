import './App.css';
import MetaTags from 'react-meta-tags';

import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      <MetaTags>
        <title>Sundaeswap ISO Rewards Calculator</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </MetaTags>
      <Calculator />
    </div>
  );
}

export default App;
