import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import PortfolioPage from './pages/PortfolioPage'
import MyToolsPage from './pages/MyToolsPage'
import ExpensePage from './pages/expense/ExpensePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/my-tools" element={<MyToolsPage />} />
        <Route path="/my-tools/expense" element={<ExpensePage />} />
      </Routes>
    </BrowserRouter>
  )
}
