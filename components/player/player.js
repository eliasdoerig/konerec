import { useState, useEffect, useRef } from "react";
import PlayerHeader from "./playerHeader";

export default function Player({
  tracks,
  trackIndex,
  isPlaying,
  audioControls,
  audioRef,
}) {
  const [isOpen, toggle] = useState(false);
  const isReady = useRef(false);

  // Destructure for conciseness
  const track = tracks[trackIndex];
  const { audioSrc, description, lyrics, links } = track;

  const loadAudio = (audioSrc) => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.setAttribute("preload", "metadata");
    audioRef.current.addEventListener("ended", () => {
      audioControls.toNextTrack();
    });
  };

  useEffect(() => {
    loadAudio(audioSrc);
  }, []);

  useEffect(() => {
    audioRef.current.pause();
    loadAudio(audioSrc);
    if (isReady.current) {
      audioControls.play();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean on unmount
    return () => {
      audioRef.current.pause();
      audioRef.current.removeEventListener("ended", () => {
        audioControls.toNextTrack();
      });
    };
  }, []);

  return (
    <section id="player" className={isOpen ? "open" : ""}>
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
            <p>{description}</p>
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
            <h3>Lyrics</h3>
            <p>{lyrics}</p>
          </div>
        </div>
        <div className="latest-release">
          <ul className="releases">
            <h3>Latest Releases</h3>
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
                  <img
                    src={`${track.cover.url}?fm=webp&w=100&h=100`}
                    title={track.cover.title}
                    alt={track.cover.alt}
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
