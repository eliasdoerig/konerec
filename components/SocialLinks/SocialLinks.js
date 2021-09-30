import classes from "./SocialLinks.module.scss";

export default function Footer() {
  const year = function () {
    const d = new Date();
    const y = d.getFullYear();
    return y;
  };
  return (
    <footer className={classes.footer}>
      <ul className={classes.social}>
        <li>
          <a href="https://youtube.com/" target="_blank" rel="noreferrer">
            youtube
          </a>
        </li>
        <li>
          <a href="https://bandcamp.com/" target="_blank" rel="noreferrer">
            bandcamp
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
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            facebook
          </a>
        </li>
      </ul>
      <p className={classes.copyright}>
        <span>©</span>
        {year()} K1records
      </p>
    </footer>
  );
}
