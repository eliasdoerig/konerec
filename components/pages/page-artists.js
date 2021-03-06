import { useRouter } from "next/router";
import { INLINES } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Link from "next/link";
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
        <Image
          src={`https:${image.url}?fm=webp&fit=fill&w=500&h=500&q=75`}
          title={image.title}
          alt={image.alt}
          width={500}
          height={500}
          layout="responsive"
          loading="lazy"
        />
      </div>
      <div className="details">
        <h2>{name}</h2>
        <p className="description">{description}</p>
        <div
          className="links"
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(links, options),
          }}
        ></div>
        {releases[0] ? <h3>Releases</h3> : ""}
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
                <Image
                  src={`https:${release.cover.url}?fm=webp&w=100&h=100`}
                  title={release.cover.title}
                  alt={release.cover.alt}
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
    </li>
  );
}

export default function PageArtists({
  artists,
  tracks,
  isPlaying,
  toIdTrack,
  trackIndex,
  content,
}) {
  const router = useRouter();
  const slug = "artists";
  const isCurrent = router.query.slug === slug;
  return (
    <section id="page-artists" className={`page ${isCurrent ? "open" : ""}`}>
      <Link href={isCurrent ? "/" : `/${slug}`} shallow>
        <a className="head">
          <h1>
            <span>{content.title}</span>
          </h1>
        </a>
      </Link>
      <div className="content">
        <p>{content.intro}</p>
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
