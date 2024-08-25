import React, { useState, useEffect } from 'react';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        document.title = "21BCE9336"; // Replace with your roll number
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://your-backend-url.com/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: JSON.parse(input) }),
            });
            const result = await res.json();
            setResponse(result);
            setError(null);
        } catch (err) {
            setError('Invalid JSON');
            setResponse(null);
        }
    };

    return (
        <div>
            <h1>BFHL Challenge</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter JSON here"
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <select onChange={(e) => setOptions([...options, e.target.value])} multiple>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div>
                        {options.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {options.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {options.includes('highest_lowercase_alphabet') && (
                            <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
