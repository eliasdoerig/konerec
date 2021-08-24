import { useRef, useEffect } from "react";

export default function PlayerHeader({
  toggle,
  isOpen,
  track,
  isPlaying,
  audioControls,
}) {
  const { artist, title } = track;
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
        onClick={() => {
          toggle(!isOpen);
        }}
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
