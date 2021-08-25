import { useRouter } from "next/router";
import Link from "next/link";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default function PageAbout({ content }) {
  const router = useRouter();
  const slug = "about";
  const isCurrent = router.query.slug === slug;
  console.log(content);
  return (
    <section id="page-about" className={`page ${isCurrent ? "open" : ""}`}>
      <Link href={isCurrent ? "/" : `/${slug}`} shallow>
        <a className="head">
          <h1>
            <span>{content.title}</span>
          </h1>
        </a>
      </Link>
      <div
        className="content max-width"
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(content.text),
        }}
      ></div>
    </section>
  );
}
