import { useRouter } from "next/router";
import Link from "next/link";

export default function PageTeam({ team }) {
  const router = useRouter();
  const slug = "team";
  const isCurrent = router.query.slug === slug;
  console.log(team);
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
        <img src="" />
        <ul className="team">
          {team.map((member, i) => {
            return (
              <li key={`member-${i}`}>
                <img src={`${member.image}?fm=webp&w=600&h=600`} />
                <div className="details">
                  <h2>{member.name}</h2>
                  <p>{member.description}</p>
                  <ul className="links">
                    <li>
                      <a>mail</a>
                    </li>
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
