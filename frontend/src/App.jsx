import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import ProviderPage from './pages/ProviderPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/provider/:id" element={<ProviderPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
