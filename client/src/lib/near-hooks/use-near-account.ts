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
        
        // Mock account info for demo
        // In production, this would use wallet.account() and account.getAccountBalance()
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockAccount = {
          accountId,
          getAccountBalance: () => Promise.resolve({
            total: "1000000000000000000000000",
            available: "950000000000000000000000",
          }),
        };

        setState({
          account: mockAccount,
          balance: "95.5",
          accountId,
          loading: false,
          error: null,
        });
      } catch (error) {
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
