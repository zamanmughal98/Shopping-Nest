import '../styles/app.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './login/login.jsx';
import ErrorPage from './login/error/ErrorPage.jsx';

function App() {
  const pageNotFound = {
    name: 'Error !',
    code: '404',
    message: 'Page Not Found',
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage {...pageNotFound} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
