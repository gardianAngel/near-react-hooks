import React, { useState } from 'react';
import { NearProvider, useNearWallet, useNearAccount } from '@/lib/near-hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wallet, RefreshCw, AlertTriangle } from 'lucide-react';

function WalletDemo() {
  const { signIn, signOut, accountId, isConnected, loading, error } = useNearWallet();
  const { balance, loading: balanceLoading, error: balanceError } = useNearAccount();

  const formatBalance = (bal: string | null) => {
    if (!bal) return '0.0000';
    const num = parseFloat(bal);
    return num.toFixed(4);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Live NEAR Wallet Test
        </CardTitle>
        <CardDescription>
          Connect your actual NEAR wallet to test the hooks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={isConnected ? "default" : "secondary"}>
            {loading ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
            )}
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>

        {/* Account Info */}
        {isConnected && accountId && (
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium">Account:</span>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                {accountId}
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium">Balance:</span>
              <div className="flex items-center gap-2 mt-1">
                {balanceLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : balanceError ? (
                  <span className="text-red-500 text-sm">Error loading balance</span>
                ) : (
                  <span className="font-mono text-lg">{formatBalance(balance)} NEAR</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {isConnected ? (
            <div className="space-y-2">
              <Button
                onClick={signOut}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Disconnect Wallet
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => signIn()}
              disabled={loading}
              className="w-full"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Connect NEAR Wallet
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• This connects to NEAR testnet</p>
          <p>• Your wallet will open in a new tab</p>
          <p>• No transactions will be made</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LiveDemo() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-3">Try It Live</h3>
        <p className="text-gray-600 mb-4">
          Test the NEAR React Hooks with your actual wallet
        </p>
        
        {!showDemo ? (
          <Button onClick={() => setShowDemo(true)}>
            Launch Live Demo
          </Button>
        ) : (
          <div className="flex justify-center">
            <NearProvider>
              <WalletDemo />
            </NearProvider>
          </div>
        )}
      </div>
    </div>
  );
}