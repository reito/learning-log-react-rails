import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%'
    }}>
      <h1 style={{textAlign: 'center'}}>Counter</h1>
      <p style={{textAlign: 'center', fontSize: '2rem', margin: '1rem 0'}}>{count}</p>
      <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
        <button onClick={() => setCount(c => c + 1 )}>+1</button>
        <button onClick={() => setCount(c => c - 1 )}>-1</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    </div>
  )
}

export default App;