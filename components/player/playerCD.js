import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
          <Link href="/" shallow>
            <span>Know 1 records</span>
          </Link>
        </h1>
      </div>
      <div ref={songCover} className="song-cover">
        <Image
          src={`https:${trackCover.url}?fm=jpg&fl=progressive&w=1000&h=1000&q=70`}
          title={trackCover.title}
          alt={trackCover.alt}
          height={1000}
          width={1000}
        />
      </div>
    </section>
  );
}
