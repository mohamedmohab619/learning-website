import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white py-12 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 mb-8 pb-8 border-b border-slate-700">
          <div className="flex items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-xl">T</div>
              <div>
                <h3 className="text-2xl font-bold mb-1">TOTC</h3>
                <p className="text-slate-400 text-sm">Virtual Class for Zoom</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-4">Subscribe to get our Newsletter</h3>
            <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full py-3 pl-11 pr-4 bg-slate-700 border border-slate-600 rounded-lg text-white text-base outline-none transition-all focus:border-teal-500 focus:ring-3 focus:ring-teal-500/10 placeholder:text-slate-400"
                  required
                />
              </div>
              <button type="submit" className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-teal-600 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/careers" className="text-slate-400 text-sm hover:text-white transition-colors">Careers</Link>
            <Link to="/privacy" className="text-slate-400 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-400 text-sm hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
          <p className="text-slate-400 text-sm">
            © 2024 Class Technologies Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

