import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import LoginForm from './components/LoginForm.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
};
export default App;
