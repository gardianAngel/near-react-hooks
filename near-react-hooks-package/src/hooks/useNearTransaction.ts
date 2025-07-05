import { useState, useEffect } from 'react';
import { providers } from 'near-api-js';
import { useNearProvider } from '../providers/NearProvider';
import { TransactionState } from '../types';

export function useNearTransaction(transactionHash?: string): TransactionState {
  const { near } = useNearProvider();
  const [state, setState] = useState<TransactionState>({
    status: null,
    loading: false,
    error: null,
    receipt: null,
  });

  useEffect(() => {
    if (!transactionHash || !near) {
      setState({
        status: null,
        loading: false,
        error: null,
        receipt: null,
      });
      return;
    }

    const checkTransaction = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const provider = near.connection.provider as providers.JsonRpcProvider;
        
        // Get transaction status
        const result = await provider.txStatus(transactionHash, 'unused');
        
        // Determine status based on transaction result
        let status: 'pending' | 'success' | 'failure';
        if (result.status && typeof result.status === 'object') {
          if ('SuccessValue' in result.status || 'SuccessReceiptId' in result.status) {
            status = 'success';
          } else {
            status = 'failure';
          }
        } else {
          status = 'pending';
        }

        setState({
          status,
          loading: false,
          error: null,
          receipt: result,
        });
      } catch (error) {
        // If transaction is not found, it might still be pending
        if (error instanceof Error && error.message.includes('does not exist')) {
          setState({
            status: 'pending',
            loading: false,
            error: null,
            receipt: null,
          });
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            status: 'failure',
            error: error instanceof Error ? error.message : 'Failed to check transaction',
          }));
        }
      }
    };

    checkTransaction();
    
    // Poll for transaction status every 2 seconds if still pending
    const interval = setInterval(() => {
      if (state.status === 'pending' || state.status === null) {
        checkTransaction();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [transactionHash, near, state.status]);

  return state;
}