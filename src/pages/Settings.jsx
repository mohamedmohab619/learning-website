import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Bell, Mail, HelpCircle, Shield, Moon, Sun, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Here you would call an API to delete the account
      alert("Account deleted!");
      logout();
      navigate("/register");
    }
  };

  const services = [
    { 
      title: "Appearance", 
      description: "Switch between light and dark mode",
      icon: isDark ? Sun : Moon,
      hasToggle: true
    },
    { 
      title: "Notifications", 
      description: "Manage your notification settings",
      icon: Bell,
      hasNotifications: true
    },
    { 
      title: "Help", 
      description: "Need help? Contact us at TOTC22@gmail.com", 
      icon: HelpCircle,
      link: "mailto:ziad.mosfafa.695@gmail.com" 
    },
    { 
      title: "Security Options", 
      description: "You can delete this account.",
      icon: Shield,
      hasDelete: true
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans flex justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 text-center mb-8">Settings</h1>

        <section className="flex flex-col gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="text-cyan-400 dark:text-cyan-300" size={24} />
                  <h2 className="text-lg font-semibold text-cyan-400 dark:text-cyan-300">{service.title}</h2>
                </div>
                <p className="text-gray-800 dark:text-gray-300 text-sm mb-3">{service.description}</p>

                {service.hasToggle && (
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isDark ? 'bg-teal-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isDark ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )}

                {service.hasNotifications && (
                  <div className="flex flex-col mt-2 gap-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                      <input 
                        type="checkbox" 
                        checked={emailNotif} 
                        onChange={() => setEmailNotif(!emailNotif)}
                        className="w-5 h-5 accent-teal-500 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-700 dark:text-gray-300">SMS Notifications</span>
                      <input 
                        type="checkbox" 
                        checked={smsNotif} 
                        onChange={() => setSmsNotif(!smsNotif)}
                        className="w-5 h-5 accent-teal-500 cursor-pointer"
                      />
                    </label>
                  </div>
                )}

                {service.link && (
                  <a 
                    href={service.link} 
                    className="inline-flex items-center gap-2 mt-3 text-teal-600 dark:text-teal-400 font-bold hover:underline transition-colors"
                  >
                    <Mail size={18} />
                    Contact Support
                  </a>
                )}

                {service.hasDelete && (
                  <button 
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition-all hover:-translate-y-0.5"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 size={18} />
                    Delete Account
                  </button>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
