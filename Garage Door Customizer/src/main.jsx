import { StrictMode,useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,useLocation, HashRouter} from 'react-router-dom'
import App from './components/App.jsx'
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; 
}
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <HashRouter>
      <App />

    </HashRouter>
  // </StrictMode>,
)
