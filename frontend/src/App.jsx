import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
