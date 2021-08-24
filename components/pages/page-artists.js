import { useRouter } from "next/router";
import Link from "next/link";

function Artist({
  id,
  name,
  description,
  links,
  image,
  toIdTrack,
  trackIndex,
  isPlaying,
  tracks,
}) {
  const releases = tracks.filter((track) => track.artistId === id);
  return (
    <li className="artist">
      <div className="image">
        <img
          src={`${image.url}?fm=webp&fit=fill&w=400&h=600`}
          title={image.title}
          alt={image.alt}
          width={400}
          height={600}
        />
      </div>
      <div className="details">
        <h2>{name}</h2>
        <ul className="links">
          {links.map((link, i) => {
            return (
              <li key={`link-${i}`}>
                <a href={link.href} className="button">
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="description">{description}</p>
        <h3>Releases</h3>
        <ul className="releases">
          {releases.map((release, i) => {
            const isCurrent = release.id === tracks[trackIndex].id;
            return (
              <li
                key={`release-${i}`}
                className={`song-button
                    ${isCurrent ? " current" : ""}
                    ${isCurrent && !isPlaying ? " pause" : ""}`}
                onClick={() => {
                  toIdTrack(release.id);
                }}
              >
                <img
                  src={`${release.cover.url}?fm=webp&w=100&h=100`}
                  title={release.cover.title}
                  alt={release.cover.alt}
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default function PageArtists({
  artists,
  tracks,
  isPlaying,
  toIdTrack,
  trackIndex,
}) {
  const router = useRouter();
  const slug = "artists";
  const isCurrent = router.query.slug === slug;

  return (
    <section id="page-artists" className={`page ${isCurrent ? "open" : ""}`}>
      <Link href={isCurrent ? "/" : `/${slug}`} shallow>
        <a className="head">
          <h1>
            <span>Know 1 knows</span>
          </h1>
        </a>
      </Link>
      <div className="content">
        <p className="big">
          Our artists wish to remain anonymous and they don’t play live. <br />
          So… if you like the music… please be generous on bandcamp and with
          airplays if you’re a broadcaster.
        </p>
        <ul className="artists">
          {artists.map((artist, i) => {
            return (
              <Artist
                key={`artist-${i}`}
                {...artist}
                toIdTrack={toIdTrack}
                trackIndex={trackIndex}
                isPlaying={isPlaying}
                tracks={tracks}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
