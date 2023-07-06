import './styles.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <div className="App">{count}</div>;
}
