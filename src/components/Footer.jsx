export default function Footer() {
  return (
    <footer className="app-footer text-center py-3">
      <small>
        © {new Date().getFullYear()} Shortify · Pedro Nunes ·{" "}
        <a
          href="https://github.com/pedronns/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </small>
    </footer>
  )
}
