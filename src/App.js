import React, { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      Hello From Webpack {counter} clicks
      <button onClick={() => handleClick()}>Press</button>
    </div>
  );
};

export default App;
