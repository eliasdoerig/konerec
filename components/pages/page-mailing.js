import { useRouter } from "next/router";
import Link from "next/link";

export default function PageMailing() {
  const router = useRouter();
  const slug = "mailing";
  const isCurrent = router.query.slug === slug;

  return (
    <section id="page-mailing" className={`page ${isCurrent ? "open" : ""}`}>
      <Link href={isCurrent ? "/" : `/${slug}`} shallow>
        <a className="head">
          <h1>
            <span>Know 1 gives a fuck</span>
          </h1>
        </a>
      </Link>
      <div className="content max-width">
        <p>
          If you subscribe to our mailing list, Know 1 will break your balls… we
          don’t send many emails, only if we have something to say or to give.
        </p>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
