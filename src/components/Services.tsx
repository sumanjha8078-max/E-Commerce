import { FaSearchDollar, FaCheckCircle, FaBell, FaStore } from "react-icons/fa";

const services = [
  {
    icon: <FaSearchDollar />,
    title: process.env.NEXT_PUBLIC_DATA_MODE === 'live' ? "Live Tracking" : "Price Tracking",
    desc: process.env.NEXT_PUBLIC_DATA_MODE === 'live' ? "We scan prices regularly." : "Track prices you care about (demo mode).",
  },
  {
    icon: <FaStore />,
    title: "Multi-Vendor Comparison",
    desc: "Amazon, Flipkart, Myntra & more.",
  },
  {
    icon: <FaBell />,
    title: "Deal Alerts",
    desc: "Get notified when prices drop.",
  },
  {
    icon: <FaCheckCircle />,
    title: "GreedyScore Rating",
    desc: "Algorithmically rates the quality of the deal.",
  },
];

export default function Services() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl"
          >
            <div className="text-[#ff2d3d] text-4xl bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
              {item.icon}
            </div>

            <div>
              <h3 className="text-lg font-bold text-black dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}