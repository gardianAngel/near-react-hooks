import { useState, useEffect, useCallback } from "react";
import { useNear } from "./near-provider";
import { WalletState } from "./types";

export function useNearWallet() {
  const { near, initialized } = useNear();
  const [state, setState] = useState<WalletState>({
    wallet: null,
    accountId: null,
    isConnected: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!initialized) return;

    const initWallet = async () => {
      try {
        console.log('Initializing NEAR wallet connection...');
        
        // For browser compatibility, implement a simple wallet interface
        // that redirects to NEAR wallet without Node.js dependencies
        const wallet = {
          isSignedIn: () => {
            // Check for wallet callback params in URL
            return window.location.search.includes('account_id') || 
                   localStorage.getItem('near_app_wallet_auth_key') !== null;
          },
          getAccountId: () => {
            // Get account ID from URL params or localStorage
            const urlParams = new URLSearchParams(window.location.search);
            const accountId = urlParams.get('account_id');
            if (accountId) {
              localStorage.setItem('near_account_id', accountId);
              return accountId;
            }
            return localStorage.getItem('near_account_id');
          },
          requestSignIn: async ({ contractId, methodNames }: any = {}) => {
            const appTitle = 'NEAR React Hooks Demo';
            const successUrl = window.location.origin + window.location.pathname;
            const failureUrl = successUrl;
            
            const walletUrl = 'https://wallet.testnet.near.org/login/?';
            const params = new URLSearchParams({
              contract_id: contractId || '',
              success_url: successUrl,
              failure_url: failureUrl,
              app_title: appTitle,
            });
            
            window.location.assign(walletUrl + params.toString());
          },
          signOut: () => {
            localStorage.removeItem('near_account_id');
            localStorage.removeItem('near_app_wallet_auth_key');
            // Clear URL params
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        };
        
        const isSignedIn = wallet.isSignedIn();
        const accountId = isSignedIn ? wallet.getAccountId() : null;
        
        console.log('Wallet initialized:', { isSignedIn, accountId });

        setState({
          wallet,
          accountId,
          isConnected: isSignedIn,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to initialize wallet",
        }));
      }
    };

    initWallet();
  }, [initialized, near]);

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
    if (!state.wallet) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Mock sign out for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setState(prev => ({
        ...prev,
        accountId: null,
        isConnected: false,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Sign out failed",
      }));
    }
  }, [state.wallet]);

  return {
    ...state,
    signIn,
    signOut,
  };
}
