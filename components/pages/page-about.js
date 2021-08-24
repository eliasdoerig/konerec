import { useRouter } from "next/router";
import Link from "next/link";

export default function PageAbout() {
  const router = useRouter();
  const slug = "about";
  const isCurrent = router.query.slug === slug;

  return (
    <section id="page-about" className={`page ${isCurrent ? "open" : ""}`}>
      <Link href={isCurrent ? "/" : `/${slug}`} shallow>
        <a className="head">
          <h1>
            <span>Know 1 rules</span>
          </h1>
        </a>
      </Link>
      <div className="content max-width">
        <h2>Know 1 pays</h2>
        <p>
          Know 1 records distributes all income equally between all its 12
          affiliated artists, no matter if they published something or not.
        </p>
        <h2>Know 1 is special</h2>
        <p>
          Know 1 records is where the musical Banksys hide… all our artists have
          to remain anonymous and don’t play live. If you wish to interview
          them, you can send an email
        </p>
        <p>
          If you have any questions, all you gotta do is ask… Know 1 will
          answer. <a href="mailto:noreply@k1rec.org">noreply@k1rec.org</a>
        </p>
      </div>
    </section>
  );
}
