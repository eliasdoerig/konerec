export default function Footer() {
  const date = function () {
    const d = new Date();
    const y = d.getFullYear();
    return y;
  };
  return (
    <footer>
      <ul className="social">
        <li>
          <a href="https://instagram.com">instagram</a>
        </li>
        <li>
          <a href="https://facebook.com">facebook</a>
        </li>
        <li>
          <a href="https://bandcamp.com">bandcamp</a>
        </li>
      </ul>
      <p className="copyright">
        <span>©</span> {date()} K1record
      </p>
    </footer>
  );
}
