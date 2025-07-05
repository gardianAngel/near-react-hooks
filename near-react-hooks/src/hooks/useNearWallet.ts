import { useState, useEffect, useCallback } from 'react';
import { WalletConnection } from 'near-api-js';
import { useNearProvider } from '../providers/NearProvider';
import { WalletState } from '../types';

export function useNearWallet(): WalletState & {
  signIn: (contractId?: string, methodNames?: string[]) => Promise<void>;
  signOut: () => Promise<void>;
} {
  const { config, near } = useNearProvider();
  const [state, setState] = useState<WalletState>({
    wallet: null,
    accountId: null,
    isConnected: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!near) return;

    const initWallet = async () => {
      try {
        const wallet = new WalletConnection(near, 'near-react-hooks');
        const isSignedIn = wallet.isSignedIn();
        const accountId = isSignedIn ? wallet.getAccountId() : null;

        setState({
          wallet,
          accountId,
          isConnected: isSignedIn,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to initialize wallet',
        }));
      }
    };

    initWallet();
  }, [near]);

  const signIn = useCallback(async (contractId?: string, methodNames?: string[]) => {
    if (!state.wallet) {
      throw new Error('Wallet not initialized');
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await state.wallet.requestSignIn({
        contractId,
        methodNames,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Sign in failed',
      }));
    }
  }, [state.wallet]);

  const signOut = useCallback(async () => {
    if (!state.wallet) {
      throw new Error('Wallet not initialized');
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      state.wallet.signOut();
      
      setState(prev => ({
        ...prev,
        accountId: null,
        isConnected: false,
        loading: false,
      }));
      
      // Reload the page to clear the session
      window.location.reload();
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Sign out failed',
      }));
    }
  }, [state.wallet]);

  return {
    ...state,
    signIn,
    signOut,
  };
}