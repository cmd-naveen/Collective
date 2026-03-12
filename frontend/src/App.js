import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import AuthorPage from './pages/AuthorPage';
import { AboutPage, PrivacyPage, TermsPage, AdvertisePage } from './pages/LegalPages';

function NotFound() {
  return (
    <div className="site-content">
      <div className="site-container">
        <div className="not-found-page">
          <p className="error-code" aria-hidden="true">404</p>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/" className="btn-home">Go Back Home</a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App" style={{ background: '#fff', minHeight: '100vh' }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/author/:slug" element={<AuthorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
