import { Card, CardContent } from "@/components/ui/card";
import { Wallet, FileText, User, BarChart3 } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Wallet,
      title: "Wallet Connection",
      description: "Connect, disconnect, and manage wallet state with useNearWallet() hook.",
      color: "bg-near-blue"
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Interact with contracts using useNearContract() with automatic error handling.",
      color: "bg-near-purple"
    },
    {
      icon: User,
      title: "Account Info",
      description: "Get account balance and details with useNearAccount() hook.",
      color: "bg-near-green"
    },
    {
      icon: BarChart3,
      title: "Transaction Tracking",
      description: "Track transaction status and polling with useNearTransaction() hook.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need for NEAR Integration
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Built with TypeScript for complete type safety and developer experience in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
