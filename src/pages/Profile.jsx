import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Calendar, GraduationCap, Save, Edit, X } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const [userData, setUserData] = useState({
    name: user?.username || user?.name || "Ziad Mostafa",
    id: user?.id || "54867548",
    email: user?.email || "ziad.mosfafa.695@gmail.com",
    track: user?.track || "Front-End",
    phone_number: user?.phone || user?.phone_number || "01227688433",
    Date_birth: user?.dateOfBirth || user?.Date_birth || "2004-11-25",
    image: user?.image || user?.avatar || "https://via.placeholder.com/256",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profile using AuthContext
      if (updateProfile) {
        await updateProfile({
          username: userData.name,
          email: userData.email,
          phone: userData.phone_number,
          dateOfBirth: userData.Date_birth,
          track: userData.track,
          image: userData.image,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    setUserData({
      name: user?.username || user?.name || "Ziad Mostafa",
      id: user?.id || "54867548",
      email: user?.email || "ziad.mosfafa.695@gmail.com",
      track: user?.track || "Front-End",
      phone_number: user?.phone || user?.phone_number || "01227688433",
      Date_birth: user?.dateOfBirth || user?.Date_birth || "2004-11-25",
      image: user?.image || user?.avatar || "https://via.placeholder.com/256",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full max-w-5xl flex flex-col gap-8 transition-all">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-2">Profile</h1>
        
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={userData.image}
              alt="profile"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-cyan-400 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={isEditing ? handleImageClick : undefined}
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={handleImageClick}>
                <Edit className="text-white" size={32} />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {!isEditing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-center mb-6">
              <div className="bg-gray-100 rounded-2xl flex flex-col justify-center items-center p-5 h-36 hover:shadow-md transition-shadow">
                <label className="text-gray-500 font-medium mb-2 flex items-center gap-2">
                  <User size={18} />
                  Name
                </label>
                <h3 className="text-gray-800 font-semibold text-center">{userData.name}</h3>
              </div>

              <div className="bg-gray-100 rounded-2xl flex flex-col justify-center items-center p-5 h-36 hover:shadow-md transition-shadow">
                <label className="text-gray-500 font-medium mb-2 flex items-center gap-2">
                  <GraduationCap size={18} />
                  Student ID
                </label>
                <h3 className="text-gray-800 font-semibold text-center">{userData.id}</h3>
              </div>

              <div className="bg-gray-100 rounded-2xl flex flex-col justify-center items-center p-5 h-36 hover:shadow-md transition-shadow">
                <label className="text-gray-500 font-medium mb-2 flex items-center gap-2">
                  <Mail size={18} />
                  Email
                </label>
                <h3 className="text-gray-800 font-semibold text-center break-all text-sm">{userData.email}</h3>
              </div>

              <div className="bg-gray-100 rounded-2xl flex flex-col justify-center items-center p-5 h-36 hover:shadow-md transition-shadow">
                <label className="text-gray-500 font-medium mb-2 flex items-center gap-2">
                  <Phone size={18} />
                  Number
                </label>
                <h3 className="text-gray-800 font-semibold text-center">{userData.phone_number}</h3>
              </div>

              <div className="bg-gray-100 rounded-2xl flex flex-col justify-center items-center p-5 h-36 hover:shadow-md transition-shadow">
                <label className="text-gray-500 font-medium mb-2 flex items-center gap-2">
                  <Calendar size={18} />
                  Date of Birth
                </label>
                <h3 className="text-gray-800 font-semibold text-center">{userData.Date_birth}</h3>
              </div>

              <div className="bg-gray-100 rounded-2xl flex flex-col justify-center items-center p-5 h-36 hover:shadow-md transition-shadow">
                <label className="text-gray-500 font-medium mb-2 flex items-center gap-2">
                  <GraduationCap size={18} />
                  Track
                </label>
                <h3 className="text-gray-800 font-semibold text-center">{userData.track}</h3>
              </div>
            </div>

            <div className="text-center">
              <button
                className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-3xl transition-colors mt-4 flex items-center gap-2 mx-auto"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={20} />
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-2xl mx-auto"
          >
            <div>
              <label className="text-gray-700 font-medium mb-2 block">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border-2 border-cyan-400 rounded-3xl px-4 py-3 outline-none w-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-2 block">Student ID</label>
              <input
                type="text"
                name="id"
                value={userData.id}
                onChange={handleChange}
                placeholder="Your ID"
                className="border-2 border-cyan-400 rounded-3xl px-4 py-3 outline-none w-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border-2 border-cyan-400 rounded-3xl px-4 py-3 outline-none w-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-2 block">Phone number</label>
              <input
                type="tel"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleChange}
                placeholder="Your number"
                className="border-2 border-cyan-400 rounded-3xl px-4 py-3 outline-none w-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-2 block">Date of Birth</label>
              <input
                type="date"
                name="Date_birth"
                value={userData.Date_birth}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-3xl px-4 py-3 outline-none w-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-2 block">Track</label>
              <select
                name="track"
                value={userData.track}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-3xl px-4 py-3 outline-none w-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                required
              >
                <option value="Front-End">Front-End</option>
                <option value="Back-End">Back-End</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>

            <div className="flex gap-4 justify-center mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-3xl transition-colors flex items-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-3xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
