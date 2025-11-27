import { Search, Bell, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Topbar({
  onMenuClick,
  searchQuery = "",
  onSearchChange,
  title = "Hello Mohamed 👋",
  subtitle = "Let's learn something new today!"
}) {
  const [profileImage, setProfileImage] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Get profile image from localStorage
  useEffect(() => {
    const image = localStorage.getItem('profileImage');
    setProfileImage(image);
    
    // Listen for storage changes (when profile image is updated in ProfileCard)
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem('profileImage');
      setProfileImage(updatedImage);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-window updates
    window.addEventListener('profileImageUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileImageUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-between mb-6 gap-4">
      {/* Left - Menu button (mobile only) and greeting */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu button - only visible on mobile */}
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

        {/* Search box - hidden on small mobile, visible on larger screens */}
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

        {/* Mobile search - toggleable */}
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

        {/* Notification icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile mini avatar */}
        <div className="w-9 h-9 rounded-full border overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
          {profileImage ? (
            <img
              src={profileImage}
              className="w-full h-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs font-semibold">
              MM
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
