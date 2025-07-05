import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DocsSection() {
  const hooks = [
    {
      name: "useNearWallet()",
      description: "Handle wallet connection, disconnection, and account state management.",
      returns: [
        { name: "wallet", desc: "WalletConnection instance" },
        { name: "signIn", desc: "Function to sign in" },
        { name: "signOut", desc: "Function to sign out" },
        { name: "accountId", desc: "Current account ID" },
        { name: "isConnected", desc: "Connection status" },
      ]
    },
    {
      name: "useNearContract()",
      description: "Interact with smart contracts using call and view methods.",
      params: [
        { name: "contractId", desc: "Contract account ID" },
        { name: "options", desc: "Contract options" },
      ],
      returns: [
        { name: "contract", desc: "Contract instance" },
        { name: "callMethod", desc: "Call contract method" },
        { name: "viewMethod", desc: "View contract method" },
      ]
    },
    {
      name: "useNearAccount()",
      description: "Access account information including balance and account details.",
      returns: [
        { name: "account", desc: "Account instance" },
        { name: "balance", desc: "Account balance" },
        { name: "accountId", desc: "Account ID" },
        { name: "loading", desc: "Loading state" },
      ]
    },
    {
      name: "useNearTransaction()",
      description: "Track transaction status with automatic polling and retry logic.",
      params: [
        { name: "transactionHash", desc: "Transaction hash" },
      ],
      returns: [
        { name: "status", desc: "Transaction status" },
        { name: "loading", desc: "Loading state" },
        { name: "error", desc: "Error state" },
      ]
    }
  ];

  return (
    <section id="docs" className="py-20 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete API Reference
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive documentation for all available hooks and their options
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {hooks.map((hook, index) => (
            <Card key={index} className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {hook.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {hook.description}
              </p>
              
              <div className="space-y-4">
                {hook.params && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Parameters:</h4>
                    <ul className="space-y-2">
                      {hook.params.map((param, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {param.name}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {param.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {hook.returns && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Returns:</h4>
                    <ul className="space-y-2">
                      {hook.returns.map((ret, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {ret.name}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {ret.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
