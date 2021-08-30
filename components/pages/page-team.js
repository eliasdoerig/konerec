import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function PageTeam({ team }) {
  const router = useRouter();
  const slug = "team";
  const isCurrent = router.query.slug === slug;
  return (
    <section id="page-team" className={`page ${isCurrent ? "open" : ""}`}>
      <Link href={isCurrent ? "/" : `/${slug}`} shallow>
        <a className="head">
          <h1>
            <span>Know 1 works</span>
          </h1>
        </a>
      </Link>
      <div className="content">
        <ul className="team">
          {team.map((member, i) => {
            return (
              <li key={`member-${i}`}>
                <div className="image">
                  <Image
                    src={`https:${member.image.url}?fm=webp&w=400&h=400&q=75`}
                    title={member.image.title}
                    alt={member.image.alt}
                    width={400}
                    height={400}
                    layout="responsive"
                    loading="lazy"
                  />
                </div>
                <div className="details">
                  <h2>{member.name}</h2>
                  <p>{member.description}</p>
                  <ul className="links">
                    {member.email ? (
                      <li>
                        <a href={`mailto:${member.email}`}>{member.email}</a>
                      </li>
                    ) : (
                      ""
                    )}

                    {member.website ? (
                      <li>
                        <a href={member.website}>
                          {member.website.replace(/(^\w+:|^)\/\//, "")}
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
