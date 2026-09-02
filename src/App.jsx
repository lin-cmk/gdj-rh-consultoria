import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Sobre from './pages/Sobre.jsx'
import Servicos from './pages/Servicos.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import LandingNR1 from './pages/LandingNR1.jsx'
import Contato from './pages/Contato.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/nr1" element={<LandingNR1 />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  )
}

export default App

