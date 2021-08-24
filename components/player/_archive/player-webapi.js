import { useState, useEffect, useRef } from "react";
import PlayerHeader from "./playerHeader";

export default function Player({
  tracks,
  trackIndex,
  setTrackIndex,
  isPlaying,
  setIsPlaying,
}) {
  const [isOpen, toggle] = useState(false);
  //ref
  const audioRef = useRef("");
  const audioContext = useRef("");
  const source = useRef("");
  const canvas = useRef("");
  const isReady = useRef(false);

  // Destructure for conciseness
  const { title, artist, audioSrc, text, lyrics, links } = tracks[trackIndex];

  const getAudioBuffer = (url) => {
    return fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.current.decodeAudioData(arrayBuffer));
  };

  const drawAudio = (audioBuffer) => {
    draw(normalizeData(filterData(audioBuffer)));
  };

  const filterData = (audioBuffer) => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const samples = 250; // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
  };

  const normalizeData = (filteredData) => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map((n) => n * multiplier);
  };

  const draw = (normalizedData) => {
    // set up the canvas
    const ctx = canvas.current.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const padding = 20;
    ctx.scale(dpr, dpr);
    ctx.translate(0, canvas.current.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

    // draw the line segments
    const width = canvas.current.offsetWidth / normalizedData.length;
    for (let i = 0; i < normalizedData.length; i++) {
      const x = width * i;
      let height = normalizedData[i] * canvas.current.offsetHeight - padding;
      if (height < 0) {
        height = 0;
      } else if (height > canvas.current.offsetHeight / 2) {
        height = height > canvas.current.offsetHeight / 2;
      }
      drawLineSegment(ctx, x, height, width, (i + 1) % 2);
    }
  };

  const drawLineSegment = (ctx, x, height, width, isEven) => {
    ctx.lineWidth = 1; // how thick the line is
    ctx.strokeStyle = "#fff"; // what color our line is
    ctx.beginPath();
    height = isEven ? height : -height;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, 0);
    ctx.stroke();
  };

  useEffect(() => {
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    source.current = audioContext.current.createBufferSource();

    getAudioBuffer(audioSrc).then((audioBuffer) => {
      drawAudio(audioBuffer);
      source.current.buffer = audioBuffer;
      source.current.connect(audioContext.current.destination);
      source.current.start();
      setIsPlaying(true);
      console.log("play");
    });

    // audioRef.current = new Audio(audioSrc);
    // audioCtx.current.createMediaElementSource(audioRef.current);
    // audioRef.current.addEventListener("ended", toNextTrack);
  }, []);

  // useEffect(() => {
  //   audioRef.current.pause();
  //   audioRef.current = new Audio(audioSrc);
  //   audioRef.current.addEventListener("ended", toNextTrack);
  //   if (isReady.current) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //   } else {
  //     isReady.current = true;
  //   }
  // }, [trackIndex]);

  // useEffect(() => {
  //   // Pause and clean on unmount
  //   return () => {
  //     audioRef.current.pause();
  //     audioRef.current.removeEventListener("ended", toNextTrack);
  //   };
  // }, []);

  //controls
  const playPauseAudio = () => {
    if (!isPlaying) {
      source.current.start();
      setIsPlaying(true);
    } else {
      source.current.stop();
      setIsPlaying(false);
    }
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
    console.log(tracks[trackIndex]);
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
    console.log(tracks[trackIndex]);
  };

  const toIdTrack = (id) => {
    if (id === tracks[trackIndex].id) {
      playPauseAudio();
    } else {
      const i = tracks.findIndex((track) => track.id === id);
      setTrackIndex(i);
    }
    console.log(tracks[trackIndex]);
  };

  return (
    <section id="player" className={isOpen ? "open" : ""}>
      <div className="player-top">
        <PlayerHeader
          isOpen={isOpen}
          toggle={toggle}
          title={title}
          artist={artist}
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={playPauseAudio}
          canvas={canvas}
        />
      </div>
      <div className="player-bottom">
        <div className="song-details">
          <div className="description">
            <p>{text}</p>
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
                    toIdTrack(track.id);
                  }}
                >
                  <img src={track.image} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
