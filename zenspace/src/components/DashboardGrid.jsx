import TaskList from "./TaskList";

const DashboardGrid = () => {
  return (
    <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <TaskList />

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Focus Timer
        </h2>
        <div className="text-gray-500">Ready to focus?</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 col-span-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Stats Overview
        </h2>
        <div className="text-gray-500">No stats yet.</div>
      </div>
    </main>
  );
};

export default DashboardGrid;
