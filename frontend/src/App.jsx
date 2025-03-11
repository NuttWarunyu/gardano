import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello, Gardano!</h1>
      <p>Welcome to my app!</p>
      <p>
        count is {count}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </p>
    </div>
  );
};

export default App;
