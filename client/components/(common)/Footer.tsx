"use client";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-green-400">FarmBazaar</h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Empowering farmers with blockchain technology for fair pricing,
            supply chain transparency, and authentic quality verification.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Marketplace</a></li>
            <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-400 transition">Farmer Guide</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Blockchain Docs</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">Get the latest updates on agri-tech and blockchain.</p>
          <form className="flex items-center bg-gray-800 rounded-lg overflow-hidden" suppressHydrationWarning onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm text-white bg-transparent focus:outline-none"
              name="email"
              autoComplete="email"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-sm font-medium text-black transition"
              suppressHydrationWarning
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} FarmBazaar. All rights reserved.</p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-green-400"><FaFacebook size={18} /></a>
          <a href="#" className="hover:text-green-400"><FaTwitter size={18} /></a>
          <a href="#" className="hover:text-green-400"><FaLinkedin size={18} /></a>
          <a href="#" className="hover:text-green-400"><FaGithub size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
