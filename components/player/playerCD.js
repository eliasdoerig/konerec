import { useEffect, useRef } from "react";

export default function PlayerCD({ trackCover, isPlaying }) {
  const songCover = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      songCover.current.style.animationPlayState = "running";
    } else {
      songCover.current.style.animationPlayState = "paused";
    }
  }, [isPlaying]);

  return (
    <section id="page-player" className="">
      <div className="title">
        <h1>
          <span>Know 1 record</span>
        </h1>
      </div>
      <div ref={songCover} className="song-cover">
        <img
          src={`${trackCover.url}?fm=webp&w=1000&h=1000`}
          title={trackCover.title}
          alt={trackCover.alt}
          height={1000}
          width={1000}
          loading="lazy"
        />
      </div>
    </section>
  );
}
