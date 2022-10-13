import classes from "./SocialLinks.module.scss";

export default function Footer() {
  const year = function () {
    const d = new Date();
    const y = d.getFullYear();
    return y;
  };
  return (
    <footer className={classes.footer}>
  {/*
      <ul className={classes.social}>
        <li>
          <a
            href="https://mx3.ch/labels/know1records"
            target="_blank"
            rel="noreferrer"
          >
            mx3
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCEG9AVAZHK94C_2ETOkN4vg"
            target="_blank"
            rel="noreferrer"
          >
            youtube
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/k1rec/"
            target="_blank"
            rel="noreferrer"
          >
            instagram
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@know1records"
            target="_blank"
            rel="noreferrer"
          >
            tiktok
          </a>
        </li>
      </ul>
      */}
      <p className={classes.copyright}>
        <span>©</span>
        {year()} K1records
      </p>
    </footer>
  );
}
