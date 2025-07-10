import { useEffect, useState } from "preact/hooks";
import "../styles/Thoughts.css";

const ThoughtList = ({ thoughts, selectedThought, onThoughtClick, query }) => {
  return (
    <div className="thinks raleway-light">
      {thoughts.map((thought, index) => (
        <div
          key={index}
          className={`think-item ${
            selectedThought === index + 1 ? "glow" : ""
          }`}
          onClick={() => onThoughtClick(index)}
        >
          {thought}
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;
