import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import PlayerHeader from "./playerHeader";
import Image from "next/image";
import karaokeLyrics from "../../data/lyrics";

export default function Player({
  tracks,
  trackIndex,
  isPlaying,
  audioControls,
  audioRef,
}) {
  //states
  const [isOpen, toggle] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  //references
  const progressBar = useRef(null);
  const animationRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const track = tracks[trackIndex];
  const { audioSrc, description, lyrics, links } = track;

  // Functions
  const loadAudio = (audioSrc) => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.setAttribute("preload", "metadata");
    audioRef.current.addEventListener("ended", () => {
      audioControls.toNextTrack();
    });
  };

  const animation = () => {
    const time = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    progressBar.current.style.width = `${(time * 100) / duration}%`;
    requestAnimationFrame(animation);
  };

  //Mount
  useEffect(() => {
    loadAudio(audioSrc);

    // Pause and clean on unmount
    return () => {
      audioRef.current.pause();
      audioRef.current.removeEventListener("ended", () => {
        audioControls.toNextTrack();
      });
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  //progress bar animation
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animation);
      console.log("startani");
    } else {
      cancelAnimationFrame(animationRef.current);
      console.log("stopani");
    }
  }, [isPlaying, isReady]);

  //change track
  useLayoutEffect(() => {
    if (audioRef.current !== null) {
      audioControls.pause();
    }
    loadAudio(audioSrc);
    if (isReady.current) {
      audioControls.play();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  return (
    <section id="player" className={isOpen ? "open" : ""}>
      <div ref={progressBar} id="progressBar"></div>
      <div className="player-top">
        <PlayerHeader
          isOpen={isOpen}
          toggle={toggle}
          track={track}
          isPlaying={isPlaying}
          audioControls={audioControls}
        />
      </div>
      <div className="player-bottom">
        <div className="song-details">
          <div className="description">
            <h2>About</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(description),
              }}
            ></div>
            <ul className="links">
              {links.map((link, i) => {
                return (
                  <li key={`songlink-${i}`}>
                    <a className="button" href={link.url}>
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lyrics">
            <h2>Lyrics</h2>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(lyrics),
              }}
            ></div> */}
            <div>
              {karaokeLyrics.map((l, i) => {
                return (
                  <p
                    key={`l-${i}`}
                    className={
                      currentTime > l.start && currentTime < l.end
                        ? "current"
                        : ""
                    }
                  >
                    {l.string}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="latest-release">
          <h3>Latest Releases</h3>
          <ul className="releases">
            {tracks.map((track, i) => {
              const isCurrent = track.id === tracks[trackIndex].id;
              return (
                <li
                  key={`release-${i}`}
                  className={`song-button
                    ${isCurrent ? " current" : ""}
                    ${isCurrent && !isPlaying ? " pause" : ""}`}
                  onClick={() => {
                    audioControls.toIdTrack(track.id);
                  }}
                >
                  <Image
                    src={`https:${track.cover.url}?fm=webp&w=100&h=100`}
                    title={track.cover.title}
                    alt={track.cover.alt}
                    width={100}
                    height={100}
                    layout="responsive"
                    loading="lazy"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
