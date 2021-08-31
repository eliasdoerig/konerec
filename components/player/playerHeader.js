import { useState, useRef, useEffect } from "react";

export default function PlayerHeader({
  toggle,
  isOpen,
  track,
  isPlaying,
  audioControls,
}) {
  const { artist, title } = track;

  //states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  //Touch
  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientY);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientY);
  }

  function handleClick() {
    toggle(!isOpen);
  }

  function handleTouchEnd() {
    console.log(touchStart, touchEnd);
    if (touchStart - touchEnd > 150 && !isOpen) {
      // swipe down
      toggle(true);
    }
    if (touchStart - touchEnd < -150 && isOpen) {
      // swipe up
      toggle(false);
    }
    if (touchEnd == 0) {
      handleClick();
    }
    setTouchStart(0);
    setTouchEnd(0);
  }

  return (
    <>
      <button
        type="button"
        id="playpause"
        className={isPlaying ? "pause" : "play"}
        onClick={() => {
          audioControls.playPause();
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div
        className="song"
        style={{ flex: 1 }}
        onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
        onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => handleTouchEnd()}
      >
        <span className="song-title">{title}</span>
        <span className="band-name">{artist}</span>
      </div>
      <button
        type="button"
        id="prev"
        onClick={() => {
          audioControls.toPrevTrack();
        }}
      >
        Prev
      </button>
      <button
        type="button"
        id="next"
        onClick={() => {
          audioControls.toNextTrack();
        }}
      >
        Next
      </button>
    </>
  );
}
