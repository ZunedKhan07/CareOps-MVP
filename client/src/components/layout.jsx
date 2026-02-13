import { Bell, CalendarCheck, Divide, LayoutDashboard, Package } from "lucide-react"
import { Link } from "react-router-dom";


const Layout = ( {children} ) => {
    const menuItems = [
        { name: "Dashboard", icons: <LayoutDashboard size={20} />, path: "/" },
        { name: "Bookings", icons: <CalendarCheck size={200} />, path: "/bookings"},
        { name: "Inventory", icons: <Package size={20} />, path: "/inventory"},
        { name: "Alert", icons: <Bell size={20}/>, path: "/alert"}
    ];

return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
        <div className="text-2xl font-bold text-blue-600 mb-8 px-2">CareOps 🏥</div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 italic">Welcome back, Zuned Khan! 👋</h1>
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            AD
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
