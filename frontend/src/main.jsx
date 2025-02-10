import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import StartPage from './pages/StartPage.jsx';
import NewProjectPage from './pages/newProjectPage.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectPage from './pages/ProjectPage.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux'
import './css/tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>  
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/newProject' element={<NewProjectPage />} />
          <Route path='/project' element={<ProjectPage />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
