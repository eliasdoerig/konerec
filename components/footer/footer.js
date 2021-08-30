export default function Footer() {
  const year = function () {
    const d = new Date();
    const y = d.getFullYear();
    return y;
  };
  return (
    <footer>
      <ul className="social">
        <li>
          <a href="https://instagram.com" target="_blank">
            instagram
          </a>
        </li>
        <li>
          <a href="https://facebook.com" target="_blank">
            facebook
          </a>
        </li>
        <li>
          <a href="https://bandcamp.com" target="_blank">
            bandcamp
          </a>
        </li>
      </ul>
      <p className="copyright">
        <span>©</span>
        {year()} K1record
      </p>
    </footer>
  );
}
