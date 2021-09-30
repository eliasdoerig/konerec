import { useRouter } from "next/router";
import Link from "next/link";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import SocialLinks from "../SocialLinks/SocialLinks";

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
          <NewsletterForm />
        </div>
        <SocialLinks />
      </div>
    </section>
  );
}
