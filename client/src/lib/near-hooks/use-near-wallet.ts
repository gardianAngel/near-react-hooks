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
        // Mock wallet connection for demo
        // In production, this would use actual WalletConnection from near-api-js
        const mockWallet = {
          isSignedIn: () => false,
          getAccountId: () => null,
          requestSignIn: () => Promise.resolve(),
          signOut: () => Promise.resolve(),
        };

        setState({
          wallet: mockWallet,
          accountId: null,
          isConnected: false,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to initialize wallet",
        }));
      }
    };

    initWallet();
  }, [initialized, near]);

  const signIn = useCallback(async (contractId?: string) => {
    if (!state.wallet) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Mock sign in for demo
      // In production, this would call wallet.requestSignIn()
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful sign in
      setState(prev => ({
        ...prev,
        accountId: "demo-user.testnet",
        isConnected: true,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Sign in failed",
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
