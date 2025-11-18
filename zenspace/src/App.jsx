import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardGrid from "./components/DashboardGrid";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <DashboardGrid />
      </div>
    </div>
  );
};

export default App;
