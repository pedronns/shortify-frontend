import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateLink from "./pages/CreateLink"
import OpenLink from "./pages/OpenLink"
import Footer from "./components/Footer"

export default function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100">
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<CreateLink />} />
                        <Route path="/:code" element={<OpenLink />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    )
}
