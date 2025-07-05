import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InstallationSection() {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  const CodeBlock = ({ title, code, id }: { title: string; code: string; id: string }) => (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(code, id)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {copiedStates[id] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <pre className="bg-code-bg text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );

  return (
    <section id="get-started" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Install the package and start using NEAR hooks in your React app
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <CodeBlock
            title="Installation"
            code="npm install near-react-hooks"
            id="install"
          />

          <CodeBlock
            title="Setup Provider"
            code={`import { NearProvider } from 'near-react-hooks';

function App() {
  return (
    <NearProvider>
      <YourApp />
    </NearProvider>
  );
}`}
            id="provider"
          />

          <CodeBlock
            title="Use the Hooks"
            code={`import { useNearWallet, useNearContract } from 'near-react-hooks';

function MyComponent() {
  const { wallet, signIn, signOut, accountId } = useNearWallet();
  const { contract, callMethod } = useNearContract('your-contract.testnet');

  const handleContractCall = async () => {
    await callMethod('your_method', { args: 'here' });
  };

  return (
    <div>
      {accountId ? (
        <>
          <p>Connected as: {accountId}</p>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={handleContractCall}>Call Contract</button>
        </>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
}`}
            id="usage"
          />
        </div>
      </div>
    </section>
  );
}
