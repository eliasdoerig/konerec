import classes from "./Footer.module.scss";

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
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            instagram
          </a>
        </li>
        <li>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            facebook
          </a>
        </li>
        <li>
          <a href="https://bandcamp.com" target="_blank" rel="noreferrer">
            bandcamp
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
