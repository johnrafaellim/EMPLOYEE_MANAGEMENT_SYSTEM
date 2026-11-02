import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
import { DataProvider } from './context/DataContext.jsx';

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
};
export default App;
