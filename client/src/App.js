import React, { useState, useEffect } from "react";
import axios from "axios";

/** Should be a separated component but for the sake of learning it is placed here */
const useNotes = url => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(url).then(response => setNotes(response.data));
  }, [url]);

  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  //const url = "http://localhost:5000/api/notes";
  //The global constant (configured on webpack) is used in the following way in the code:
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      Hello From Webpack {counter} clicks
      <button onClick={() => handleClick()}>Press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
