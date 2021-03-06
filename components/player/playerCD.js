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
      <div className="logo">
        <Link href="/" shallow>
          <img
            src="/icons/logo.svg"
            title="Know1 records"
            alt="Know1 records"
            width={88}
            height={54}
          />
        </Link>
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
