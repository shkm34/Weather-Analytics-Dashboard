import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import DetailedView from './pages/DetailedView';
import Settings from './pages/Settings';

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path='/' element={<Dashboard />} />

          {/* Detailed view - Dynamic route */}
          <Route path="/city/:cityName" element={<DetailedView />} />
          
          {/* Settings page */}
          <Route path='/settings' element={<Settings />} />

           {/* 404 - Redirect to home if route not found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
