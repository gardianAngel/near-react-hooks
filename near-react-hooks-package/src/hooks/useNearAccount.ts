import { useState, useEffect } from 'react';
import { useNearWallet } from './useNearWallet';
import { AccountState } from '../types';
import { utils } from 'near-api-js';

export function useNearAccount(): AccountState {
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
        
        const account = wallet.account();
        const accountBalance = await account.getAccountBalance();
        
        // Convert balance from yoctoNEAR to NEAR
        const balanceInNear = utils.format.formatNearAmount(accountBalance.available);
        
        setState({
          account,
          balance: balanceInNear,
          accountId,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch account info',
        }));
      }
    };

    fetchAccountInfo();
  }, [isConnected, accountId, wallet]);

  return state;
}