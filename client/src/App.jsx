import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Alerts from "./pages/Alerts";
import Inventory from "./pages/Inventory";
import Bookings from "./pages/Bookings";
import DashBoard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/alert" element={<Alerts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;