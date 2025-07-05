import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-32 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            From <span className="text-near-blue">50+ Lines</span> to <span className="text-near-purple">3 Lines</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Dramatically simplify NEAR Protocol integration with our TypeScript React hooks library. 
            Connect wallets, interact with contracts, and track transactions effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('get-started')}
              size="lg"
              className="bg-near-blue hover:bg-blue-700"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('demo')}
            >
              Live Demo
            </Button>
          </div>
        </div>

        {/* Before/After Code Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="overflow-hidden">
            <div className="bg-red-500 text-white px-4 py-2 text-sm font-medium">
              😩 Before - 50+ Lines of Boilerplate
            </div>
            <CardContent className="p-6">
              <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                <code>{`import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
import { getConfig } from './config';

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

// Initialize connection
const near = await connect({
  deps: {
    keyStore: new keyStores.BrowserLocalStorageKeyStore()
  },
  ...nearConfig
});

// Initialize wallet connection
const walletConnection = new WalletConnection(near, 'my-app');

// Check if signed in
const isSignedIn = walletConnection.isSignedIn();
const accountId = walletConnection.getAccountId();

// Sign in function
const signIn = () => {
  walletConnection.requestSignIn({
    contractId: 'example-contract.testnet',
    methodNames: ['get_greeting', 'set_greeting']
  });
};

// Sign out function
const signOut = () => {
  walletConnection.signOut();
  window.location.reload();
};

// Get account details
const account = walletConnection.account();
const balance = await account.getAccountBalance();

// Contract interaction
const contract = new Contract(
  walletConnection.account(),
  'example-contract.testnet',
  {
    viewMethods: ['get_greeting'],
    changeMethods: ['set_greeting']
  }
);

const greeting = await contract.get_greeting();
await contract.set_greeting({
  args: { message: 'Hello World!' },
  gas: '300000000000000'
});`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="bg-green-500 text-white px-4 py-2 text-sm font-medium">
              🎉 After - 3 Lines with Hooks
            </div>
            <CardContent className="p-6">
              <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                <code>{`import { useNearWallet, useNearContract } from 'near-react-hooks';

const { wallet, signIn, signOut, accountId } = useNearWallet();
const { contract, callMethod } = useNearContract('example-contract.testnet');

// That's it! Now you can use wallet and contract methods directly
const handleGreeting = async () => {
  await callMethod('set_greeting', { message: 'Hello World!' });
};

return (
  <div>
    {accountId ? (
      <button onClick={signOut}>Sign Out</button>
    ) : (
      <button onClick={signIn}>Sign In</button>
    )}
    <button onClick={handleGreeting}>Set Greeting</button>
  </div>
);`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card className="p-6">
            <div className="text-3xl font-bold text-near-blue mb-2">94%</div>
            <p className="text-gray-600 dark:text-gray-400">Less Code</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-near-purple mb-2">10x</div>
            <p className="text-gray-600 dark:text-gray-400">Faster Development</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-near-green mb-2">100%</div>
            <p className="text-gray-600 dark:text-gray-400">TypeScript Support</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
