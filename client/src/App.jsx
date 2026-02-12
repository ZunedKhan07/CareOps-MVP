import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";

// Dummy Pages (Inhe baad mein alag files mein banayenge)
const Dashboard = () => <div className="text-xl font-bold">Dashboard Summary (Coming Soon)</div>;
const Bookings = () => <div className="text-xl font-bold">Manage Patient Bookings</div>;
const Inventory = () => <div className="text-xl font-bold">Stock Management</div>;
const AlertsPage = () => <div className="text-xl font-bold">Alert Page is Active</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/alert" element={<AlertsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;