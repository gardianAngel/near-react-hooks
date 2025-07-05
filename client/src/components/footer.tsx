import { Github, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-near rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-semibold">NEAR React Hooks</span>
            </div>
            <p className="text-gray-400 text-sm">
              Simplifying NEAR Protocol integration for React developers worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TypeScript Types</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Migration Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">NEAR Protocol</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://docs.near.org" className="hover:text-white transition-colors">Official Docs</a></li>
              <li><a href="https://dev.near.org" className="hover:text-white transition-colors">Developer Portal</a></li>
              <li><a href="https://near.org/grants" className="hover:text-white transition-colors">Grants Program</a></li>
              <li><a href="https://devhub.near.org" className="hover:text-white transition-colors">DevHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 NEAR React Hooks. Built with ❤️ for the NEAR community.</p>
        </div>
      </div>
    </footer>
  );
}
