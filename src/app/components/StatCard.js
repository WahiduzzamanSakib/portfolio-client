import { FiFolder, FiEye, FiCheckCircle, FiClock } from "react-icons/fi";

const icons = {
  projects: FiFolder,
  views: FiEye,
  published: FiCheckCircle,
  pending: FiClock,
};

export default function StatCard({ title, value, type, change }) {
  const Icon = icons[type];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {value}
          </h2>
        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
          <Icon />
        </div>
      </div>

      <p className="text-xs text-green-600 mt-4">
        {change}
      </p>

    </div>
  );
}