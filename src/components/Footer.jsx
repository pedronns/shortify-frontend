export default function Footer() {
  return (
    <footer className="app-footer text-center py-3">
      <small>
        © {new Date().getFullYear()} Shortify · Por Pedro Nunes ·{" "}
        <a href="https://github.com/pedronns/" target="_blank" rel="noopener noreferrer">
          GitHub
        </a> ·{" "}
        <a href="mailto:pedro.dnunes1@gmail.com">
          pedro.dnunes1@gmail.com
        </a>
      </small>
    </footer>
  );
}
