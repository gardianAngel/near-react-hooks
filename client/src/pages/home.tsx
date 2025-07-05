import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import DemoSection from "@/components/demo-section";
import InstallationSection from "@/components/installation-section";
import DocsSection from "@/components/docs-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <InstallationSection />
      <DocsSection />
      
      {/* CTA Section */}
      <section className="py-20 gradient-near">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build with NEAR?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of developers who have simplified their NEAR integration with our hooks library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                const element = document.getElementById('get-started');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              size="lg"
              className="bg-white text-near-blue hover:bg-gray-100"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://github.com/near-react-hooks', '_blank')}
              className="border-blue-200 text-white hover:bg-blue-600"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
