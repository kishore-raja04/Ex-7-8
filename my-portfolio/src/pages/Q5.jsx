import { useState } from "react";

export default function Q5() {
  const [input, setInput] = useState("");

  return (
    <div className="container py-4">
      <h1>Question 5</h1>
      <input 
        className="form-control my-3" 
        placeholder="Type here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
