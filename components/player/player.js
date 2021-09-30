import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { INLINES } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import PlayerHeader from "./playerHeader";
import Image from "next/image";

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      return `<a href="${
        node.data.uri
      }" target="_blank" rel="noopener noreferrer">${next(node.content)}</a>`;
    },
  },
};

export default function Player({
  tracks,
  trackIndex,
  isPlaying,
  audioControls,
  audioRef,
}) {
  //states
  const [isOpen, toggle] = useState(false);

  //references
  const progressBar = useRef();
  const animationRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const track = tracks[trackIndex];
  const { audioSrc, description, lyrics, links, download } = track;

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

  const onKeyPressed = (e) => {
    if (e.keyCode == 32) {
      audioControls.playPause();
    }
    if (e.keyCode == 39) {
      audioControls.toNextTrack();
    }
    if (e.keyCode == 37) {
      audioControls.toPrevTrack();
    }
  };

  //Change track
  useLayoutEffect(() => {
    console.log("—— useeffect change track");
    if (audioRef.current !== null && isPlaying) {
      audioControls.pause();
    }
    loadAudio(audioSrc);
    if (isReady.current && isPlaying) {
      audioControls.play();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  //Mount
  useEffect(() => {
    console.log("—— useeffect mount");
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

  useEffect(() => {
    window.addEventListener("keydown", onKeyPressed);
    return () => {
      window.removeEventListener("keydown", onKeyPressed);
    };
  }, [onKeyPressed]);

  //Progress bar animation
  useEffect(() => {
    console.log("—— useeffect playing");
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animation);
      console.log("startani");
    } else {
      cancelAnimationFrame(animationRef.current);
      console.log("stopani");
    }
  }, [isPlaying, isReady]);

  return (
    <section id="player" className={isOpen ? "open" : ""}>
      {/*Progress bar*/}
      <div ref={progressBar} id="progressBar"></div>
      {/*Player header*/}
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
        {/*Song details*/}
        <div className="song-details">
          <div className="description">
            <h2>About</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(description),
              }}
            ></div>
            <div
              className="links"
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(links, options),
              }}
            ></div>
            {download ? (
              <div className="download">
                <a href={download} target="_blank" download>
                  Download
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="lyrics">
            <h2>Lyrics</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(lyrics),
              }}
            ></div>
          </div>
        </div>
        {/*Latest Releases*/}
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
