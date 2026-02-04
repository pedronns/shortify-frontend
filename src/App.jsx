import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import CreateLink from "./pages/CreateLink"
import OpenLink from "./pages/OpenLink"
import NotFound from "./pages/NotFound"
import LinkList from "./pages/LinkList"
import Footer from "./components/Footer"
import Header from './components/Navbar'

export default function App() {
  const [links, setLinks] = useState([])
  const STORAGE_KEY = "links"

  useEffect(() => {
    const storedLinks = localStorage.getItem(STORAGE_KEY)

    if (storedLinks) {
      setLinks(JSON.parse(storedLinks))
    }
  }, [])

  function handleLinkCreated(newLink) {
    setLinks(prevLinks => {
    const map = new Map();

    [newLink, ...prevLinks].forEach(link => {
      map.set(link.code, link)
    })

    const uniqueLinks = Array.from(map.values())

    localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueLinks))

    return uniqueLinks
  })
  }

  function handleLinkDeleted(code) {
    console.log("deletando:", code)

    setLinks(prev => {
      const updated = prev.filter(link => link.code !== code)
      console.log("antes:", prev)
      console.log("depois:", updated)

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<CreateLink onLinkCreated={handleLinkCreated} />} />
            <Route path="/:code" element={<OpenLink />} />
            <Route path="/links" element={<LinkList links={links} onLinkDeleted={handleLinkDeleted} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
