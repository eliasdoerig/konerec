import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function PlayerHeader({
  toggle,
  isOpen,
  track,
  isPlaying,
  audioControls,
}) {
  const router = useRouter();
  const { artist, title } = track;

  //Refs
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  //Touch
  function handleTouchStart(e) {
    touchStart.current = e.targetTouches[0].clientY;
  }

  function handleTouchMove(e) {
    touchEnd.current = e.targetTouches[0].clientY;
  }

  function handleClick() {
    toggle(!isOpen);
    if (!isOpen) {
      const current = router.query.slug;
      console.log(current, router);
      router.push({
        pathname: router.asPath,
        query: { track: track.slug },
        shallow: true,
      });
    }
    console.log("on click");
  }

  function handleTouchEnd() {
    // swipe up
    if (
      touchStart.current - touchEnd.current > 150 &&
      touchEnd.current != 0 &&
      !isOpen
    ) {
      toggle(true);
      console.log("swipe up");
    }
    // swipe down
    if (
      touchStart.current - touchEnd.current < -150 &&
      touchEnd.current != 0 &&
      isOpen
    ) {
      toggle(false);
      console.log("swipe down");
    }
    touchStart.current = 0;
    touchEnd.current = 0;
  }

  return (
    <>
      {/*Play button*/}
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
      {/*Song details*/}
      <div
        className="song"
        style={{ flex: 1 }}
        onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
        onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => handleTouchEnd()}
        onClick={() => handleClick()}
      >
        <span className="song-title">{title}</span>
        <span className="band-name">{artist}</span>
      </div>
      {/*Previous and next buttons*/}
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
