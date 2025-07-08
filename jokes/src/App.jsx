import { useState } from "react";

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchJokes = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/jokes');
      const data = await res.json();
      setJokes(data)
    } catch (err) {
      console.error('Failed loading Jokes: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding: '2rem', fontFamily: 'Arial', textAlign:'center', justifyContent:'center'}}>
      <h1> Jokes</h1>
      <button onClick={fetchJokes} disabled={loading}>
        {loading ? 'Lade' : 'Witze laden'}
      </button>

      <ul style={{marginTop: '2rem' }}>
        {jokes.map((joke) => (
          <li key={joke.id} style={{ marginBottom: '1rem' }}>
            <strong>{joke.setup}</strong>
            <br />
            {joke.punchline}
          </li>
        ))}

      </ul>
    </div>
  );
}

export default App