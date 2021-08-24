export default function Footer() {
  const date = function () {
    const d = new Date();
    const y = d.getFullYear();
    return y;
  };
  return (
    <footer>
      <div className="social"></div>
      <div className="copyright">
        <span>© {date()} K1record</span>
      </div>
    </footer>
  );
}
