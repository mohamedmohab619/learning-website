import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileCard() {
  const { user} = useAuth();
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || null;
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('profileImage', profileImage);
    } else {
      localStorage.removeItem('profileImage');
    }
    window.dispatchEvent(new Event('profileImageUpdated'));
  }, [profileImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 overflow-hidden">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleEditClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          title="Change profile photo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full border-4 border-gray-100 shadow-md overflow-hidden bg-gray-200 flex items-center justify-center">
          {profileImage ? (
            <img
              src={profileImage}
              className="w-full h-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl font-semibold">
              {((user?.username || user?.email || "SS").slice(0, 2) || "SS")
                .toUpperCase()}
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold mt-4 text-gray-800">
          {user?.username || user?.email || "Guest User"}
        </h2>
      </div>
    </div>
  );
}
