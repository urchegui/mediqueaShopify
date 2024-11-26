import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Layout from './layout/Layout'
import AboutUs from './pages/AboutUs'
import Multimedia from './pages/Multimedia'
import Blogs from './pages/Blogs'
import Ankis from './pages/Ankis'
import NoPage from './pages/NoPage'
import Chatbot from './pages/Chatbot'

import { SelectedOptionProvider } from './services/SelectedOptionContext';
import { ShopifyProvider } from './services/ShopifyProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <ShopifyProvider>
          <SelectedOptionProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="multimedia" element={<Multimedia />} />
                <Route path="blog" element={<Blogs />} />
                <Route path="ankis" element={<Ankis />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>

          </SelectedOptionProvider>
        </ShopifyProvider>

      </BrowserRouter>
    </>
  )
}

export default App
