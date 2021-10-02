import Head from "next/head";
import Link from "next/link";
import { createClient } from "contentful";
import { useState, useRef, useEffect } from "react";

//pages
import PageArtists from "../components/pages/page-artists";
import PageAbout from "../components/pages/page-about";
import PageTeam from "../components/pages/page-team";
import PageMailing from "../components/pages/page-mailing";

//player
import PlayerCD from "../components/player/playerCD";
import Player from "../components/player/player";

export default function Index({ pages, artists, tracks, team }) {
  //Audio player
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //Audio player controls
  const audioControls = {
    play: () => {
      console.log("▶");
      audioRef.current.play();
      setIsPlaying(true);
    },
    pause: () => {
      console.log("▮▮");
      audioRef.current.pause();
      setIsPlaying(false);
    },
    playPause: () => {
      if (!isPlaying) {
        audioControls.play();
      } else {
        audioControls.pause();
      }
    },
    toNextTrack: () => {
      console.log("▶▶");
      if (trackIndex < tracks.length - 1) {
        setTrackIndex(trackIndex + 1);
      } else {
        setTrackIndex(0);
      }
    },
    toPrevTrack: () => {
      console.log("◀◀");
      if (
        audioRef.current.currentTime !== NaN &&
        audioRef.current.currentTime > 5
      ) {
        audioRef.current.currentTime = 0;
      } else {
        if (trackIndex - 1 < 0) {
          setTrackIndex(tracks.length - 1);
        } else {
          setTrackIndex(trackIndex - 1);
        }
      }
    },
    toIdTrack: (id) => {
      if (tracks[trackIndex].id !== id) {
        setTrackIndex(tracks.findIndex((track) => track.id === id));
        setIsPlaying(true);
      } else {
        audioControls.playPause();
      }
    },
  };

  useEffect(() => {
    console.log("isPlaying", isPlaying);
  }, [isPlaying]);

  return (
    <div>
      <Head>
        <title>Know 1 records</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-top">
        <PlayerCD trackCover={tracks[trackIndex].cover} isPlaying={isPlaying} />
        <div className="pages">
          <div className="player-placeholder page"></div>
          <div className="site-title">
            <h1>
              <Link href="/" shallow>
                <span>Know1 records</span>
              </Link>
            </h1>
          </div>
          <PageArtists
            artists={artists}
            tracks={tracks}
            isPlaying={isPlaying}
            toIdTrack={audioControls.toIdTrack}
            trackIndex={trackIndex}
            content={pages.find((page) => page.slug === "artists")}
          />
          <PageAbout content={pages.find((page) => page.slug === "about")} />
          <PageTeam team={team} />
          <PageMailing
            content={pages.find((page) => page.slug === "mailing")}
          />
        </div>
      </div>
      <Player
        tracks={tracks}
        trackIndex={trackIndex}
        isPlaying={isPlaying}
        setTrackIndex={setTrackIndex}
        audioControls={audioControls}
        audioRef={audioRef}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        slug: "home",
      },
    },
    {
      params: {
        slug: "artists",
      },
    },
    {
      params: {
        slug: "about",
      },
    },
    {
      params: {
        slug: "team",
      },
    },
    {
      params: {
        slug: "mailing",
      },
    },
  ];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  const res = await client.getEntries({
    content_type: ["page", "tracks", "artists", "team"],
  });
  //PAGES
  const pagesRaw = res.items.filter(
    (item) => item.sys.contentType.sys.id == "page"
  );
  const pages = pagesRaw.map((page) => {
    return {
      id: page.sys.id,
      slug: page.fields.slug,
      title: page.fields.title || "title",
      intro: page.fields.intro || "",
      text: page.fields.text || null,
    };
  });
  //ARTISTS
  const artistsRaw = res.items.filter(
    (item) => item.sys.contentType.sys.id == "artists"
  );
  const artists = artistsRaw.map((artist) => {
    return {
      id: artist.sys.id,
      name: artist.fields.name,
      description: artist.fields.description,
      image: {
        url: artist.fields.thumbnail.fields.file.url,
        title: artist.fields.thumbnail.fields.title || artist.fields.name,
        alt: artist.fields.thumbnail.fields.description || "",
      },
      links: artist.fields.links || "",
    };
  });
  //TRACKS
  const tracksRaw = res.items.filter(
    (item) => item.sys.contentType.sys.id == "tracks"
  );
  const tracks = tracksRaw.map((track) => {
    return {
      id: track.sys.id,
      artistId: track.fields.artist.sys.id,
      title: track.fields.title,
      artist: track.fields.artist.fields.name,
      audioSrc: track.fields.audio.fields.file.url,
      download: track?.fields?.download?.fields.file.url || null,
      cover: {
        url: track?.fields?.cover?.fields.file.url || null,
        title: track.fields.title + " cover",
        alt: track.fields.title + " cover",
      },
      description: track.fields.description || "",
      lyrics: track.fields.lyrics || "",
      links: track.fields.links || "",
    };
  });
  //TEAM
  const teamRaw = res.items.filter(
    (item) => item.sys.contentType.sys.id == "team"
  );
  const team = teamRaw.map((member) => {
    return {
      name: member.fields.name,
      description: member.fields.description,
      image: {
        url: member.fields.thumbnail.fields.file.url,
        title: member.fields.thumbnail.fields.title || member.fields.name,
        alt: member.fields.thumbnail.fields.description || "",
      },
      email: member.fields.email || null,
      website: member.fields.website || null,
    };
  });

  return {
    props: {
      pages: pages,
      artists: artists,
      tracks: tracks,
      team: team,
    },
  };
}
