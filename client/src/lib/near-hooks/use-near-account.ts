import { useState, useEffect } from "react";
import { useNearWallet } from "./use-near-wallet";
import { AccountState } from "./types";

export function useNearAccount() {
  const { wallet, accountId, isConnected } = useNearWallet();
  const [state, setState] = useState<AccountState>({
    account: null,
    balance: null,
    accountId: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!isConnected || !accountId || !wallet) {
      setState({
        account: null,
        balance: null,
        accountId: null,
        loading: false,
        error: null,
      });
      return;
    }

    const fetchAccountInfo = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Fetch real account balance from NEAR RPC
        const response = await fetch('https://rpc.testnet.near.org', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'dontcare',
            method: 'query',
            params: {
              request_type: 'view_account',
              finality: 'final',
              account_id: accountId,
            },
          }),
        });
        
        const data = await response.json();
        
        if (data.result) {
          // Convert yoctoNEAR to NEAR (1 NEAR = 10^24 yoctoNEAR)
          const balanceInYocto = data.result.amount;
          const balanceInNear = (parseInt(balanceInYocto) / Math.pow(10, 24)).toFixed(4);
          
          setState({
            account: data.result,
            balance: balanceInNear,
            accountId,
            loading: false,
            error: null,
          });
        } else {
          throw new Error(data.error?.message || 'Failed to fetch account');
        }
      } catch (error) {
        console.error('Error fetching account balance:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to fetch account info",
        }));
      }
    };

    fetchAccountInfo();
  }, [isConnected, accountId, wallet]);

  return state;
}
