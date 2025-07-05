import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Github, Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-near rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold">NEAR React Hooks</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 dark:text-gray-400 hover:text-near-blue transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="text-gray-600 dark:text-gray-400 hover:text-near-blue transition-colors"
            >
              Demo
            </button>
            <button 
              onClick={() => scrollToSection('docs')}
              className="text-gray-600 dark:text-gray-400 hover:text-near-blue transition-colors"
            >
              Docs
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => window.open('https://github.com/near-react-hooks', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection('get-started')}
              className="bg-near-blue hover:bg-blue-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
