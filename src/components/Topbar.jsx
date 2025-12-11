import { Search, Bell, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // import auth context

export default function Topbar({
  onMenuClick,
  searchQuery = "",
  onSearchChange,
  subtitle = "Let's learn something new today!"
}) {
  const { user } = useAuth(); // get logged-in user
  const [profileImage, setProfileImage] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const title = `Hello ${user?.user_metadata?.full_name || "Student"}`; 

  useEffect(() => {
    const image = localStorage.getItem('profileImage');
    setProfileImage(image);
    
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem('profileImage');
      setProfileImage(updatedImage);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileImageUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileImageUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-between mb-6 gap-4">

      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu size={24} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm w-48 md:w-72">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="outline-none text-sm w-full placeholder-gray-400"
          />
        </div>

        {isMobileSearchOpen ? (
          <div className="sm:hidden flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm w-full absolute top-full left-0 mt-2 z-50">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="outline-none text-sm w-full placeholder-gray-400"
              autoFocus
            />
            <button 
              onClick={() => {
                setIsMobileSearchOpen(false);
                onSearchChange?.("");
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsMobileSearchOpen(true)}
            className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Search size={20} className="text-gray-600" />
          </button>
        )}

        {/* <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button> */}

        <div className="w-9 h-9 rounded-full border overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
          {profileImage ? (
            <img
              src={profileImage}
              className="w-full h-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs font-semibold">
              {user?.user_metadata?.full_name?.split(" ").map(n => n[0]).join("") || "ST"}
              {/* initials from user's name, fallback ST */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
