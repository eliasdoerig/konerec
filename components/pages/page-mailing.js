import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../footer/footer";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default function PageMailing({ content }) {
  const router = useRouter();
  const slug = "mailing";
  const isCurrent = router.query.slug === slug;
  return (
    <section id="page-mailing" className={`page ${isCurrent ? "open" : ""}`}>
      <Link href={isCurrent ? "/" : `/${slug}`} shallow>
        <a className="head">
          <h1>
            <span>{content.title}</span>
          </h1>
        </a>
      </Link>
      <div className="content max-width">
        <div className="main">
          <div
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(content.text),
            }}
          ></div>
          <br />
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email"></input>
            <button type="submit">Submit</button>
          </form>
        </div>
        <Footer />
      </div>
    </section>
  );
}
