import { useState, useEffect } from "react";
import { TransactionState } from "./types";

export function useNearTransaction(transactionHash?: string) {
  const [state, setState] = useState<TransactionState>({
    status: null,
    loading: false,
    error: null,
    receipt: null,
  });

  useEffect(() => {
    if (!transactionHash) {
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
        
        // Mock transaction status checking for demo
        // In production, this would use near.connection.provider.txStatus()
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate successful transaction
        const mockReceipt = {
          transaction_hash: transactionHash,
          status: { SuccessValue: "" },
          receipts: [],
        };

        setState({
          status: 'success',
          loading: false,
          error: null,
          receipt: mockReceipt,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to check transaction",
        }));
      }
    };

    checkTransaction();
  }, [transactionHash]);

  return state;
}
