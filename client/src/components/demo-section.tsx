import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNearWallet } from "@/lib/near-hooks";

export default function DemoSection() {
  const { wallet, signIn, signOut, accountId, isConnected, loading } = useNearWallet();
  const [balance] = useState("95.5");

  return (
    <section id="demo" className="py-20 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Try It Live
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience the hooks in action with our interactive demo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demo Interface */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Wallet Connection Demo
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Wallet Status:</span>
                <Badge variant={isConnected ? "default" : "secondary"}>
                  {isConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Account ID:</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {accountId || "Not connected"}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Balance:</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {isConnected ? `${balance} NEAR` : "-- NEAR"}
                </span>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={signIn}
                  disabled={isConnected || loading}
                  className="flex-1 bg-near-blue hover:bg-blue-700"
                >
                  {loading ? "Connecting..." : "Connect Wallet"}
                </Button>
                <Button
                  onClick={signOut}
                  disabled={!isConnected || loading}
                  variant="outline"
                  className="flex-1"
                >
                  {loading ? "Disconnecting..." : "Disconnect"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Code Preview */}
          <Card className="overflow-hidden bg-code-bg">
            <div className="bg-gray-700 text-white px-4 py-2 text-sm font-medium">
              Component Code
            </div>
            <CardContent className="p-6">
              <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                <code>{`import { useNearWallet } from 'near-react-hooks';

function WalletDemo() {
  const { 
    wallet, 
    signIn, 
    signOut, 
    accountId, 
    balance,
    isConnected 
  } = useNearWallet();

  return (
    <div>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <p>Account: {accountId || 'Not connected'}</p>
      <p>Balance: {balance || '--'} NEAR</p>
      
      {isConnected ? (
        <button onClick={signOut}>
          Disconnect
        </button>
      ) : (
        <button onClick={signIn}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
