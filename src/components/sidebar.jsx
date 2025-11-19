import { Home, FileText, BarChart2, Folder, Mail, Settings, X } from "lucide-react";

const menu = [
  { name: "Overview", icon: <Home size={20}/> },
  { name: "Assignment", icon: <FileText size={20}/> },
  { name: "File Storage", icon: <Folder size={20}/> },
  { name: "Inbox", icon: <Mail size={20}/> },
  { name: "Settings", icon: <Settings size={20}/> },
];

export default function Sidebar({ onClose }) {
  return (
    <div className="w-64 h-full bg-white border-r p-6 flex flex-col gap-8">
      {/* Logo and close button */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Learninja</h1>
        {/* Close button - only visible on mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {menu.map((item, i) => (
          <button 
            key={i} 
            className={`flex items-center gap-3 text-gray-600 hover:bg-black hover:text-white rounded-xl p-3 transition`}
            onClick={onClose}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
