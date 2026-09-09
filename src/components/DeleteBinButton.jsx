import React, { useState, useRef } from "react";

const DeleteBinButton = ({ onDelete, title = "Remove", label = "Delete" }) => {
  const [phase, setPhase] = useState("idle"); // idle | dropping | collapsed | pulsing
  const [droppedCount, setDroppedCount] = useState(0);
  const timers = useRef([]);

  const chars = label.split("");

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    clearTimers();
    setDroppedCount(0);
    setPhase("dropping");

    chars.forEach((_, i) => {
      const t = setTimeout(() => {
        setDroppedCount(i + 1);
      }, i * 130);
      timers.current.push(t);
    });

    const collapseDelay = chars.length * 130 + 280;
    timers.current.push(
      setTimeout(() => setPhase("collapsed"), collapseDelay)
    );

    timers.current.push(
      setTimeout(() => setPhase("pulsing"), collapseDelay + 150)
    );

    timers.current.push(
      setTimeout(() => {
        onDelete();
      }, collapseDelay + 650)
    );
  };

  const isActive = phase !== "idle";

  return (
    <button
      type="button"
      className={`gulp-btn gulp-${phase}`}
      onClick={handleClick}
      title={title}
      aria-label={title}
    >
      <span className="gulp-icon-wrap">
        {phase === "pulsing" && (
          <>
            <span className="gulp-ring ring-1"></span>
            <span className="gulp-ring ring-2"></span>
          </>
        )}
        <svg
          className={`gulp-icon ${isActive ? "eating" : ""}`}
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <g className="gulp-lid">
            <path
              d="M19 6L5 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 6V4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4V6"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
          <path
            d="M6 6L7 19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19L18 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 10V17M14 10V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {phase !== "collapsed" && phase !== "pulsing" && (
        <span className="gulp-label">
          {chars.map((c, i) => (
            <span
              key={i}
              className={`gulp-char-wrap ${i < droppedCount ? "collapsed" : ""}`}
            >
              <span
                className={`gulp-char ${i < droppedCount ? "falling" : ""}`}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            </span>
          ))}
        </span>
      )}
    </button>
  );
};

export default DeleteBinButton;