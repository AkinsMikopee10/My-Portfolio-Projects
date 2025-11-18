import { useState, useEffect } from "react";

const ReflectionCard = () => {
  const [reflection, setReflection] = useState(
    () => localStorage.getItem("reflection") || ""
  );

  useEffect(() => {
    localStorage.setItem("reflection", reflection);
  }, [reflection]);

  return (
    <section className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Daily Reflection
      </h2>
      <textarea
        className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        placeholder="Write your thoughts..."
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        rows={5}
      />
      {reflection && (
        <p className="mt-2 text-gray-500 text-sm">
          ✨ You wrote something today!
        </p>
      )}
    </section>
  );
};

export default ReflectionCard;
