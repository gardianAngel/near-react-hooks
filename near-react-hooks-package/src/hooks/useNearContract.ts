import { useState, useEffect, useCallback } from 'react';
import { Contract } from 'near-api-js';
import { useNearWallet } from './useNearWallet';
import { ContractState, ContractMethods, CallMethodOptions } from '../types';

export function useNearContract(
  contractId: string,
  methods?: ContractMethods
): ContractState & {
  callMethod: (methodName: string, args?: any, options?: CallMethodOptions) => Promise<any>;
  viewMethod: (methodName: string, args?: any) => Promise<any>;
} {
  const { wallet, isConnected } = useNearWallet();
  const [state, setState] = useState<ContractState>({
    contract: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!isConnected || !wallet || !contractId) {
      setState({
        contract: null,
        loading: false,
        error: null,
      });
      return;
    }

    const initContract = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const account = wallet.account();
        const contract = new Contract(account, contractId, {
          viewMethods: methods?.viewMethods || [],
          changeMethods: methods?.changeMethods || [],
        });

        setState({
          contract,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to initialize contract',
        }));
      }
    };

    initContract();
  }, [isConnected, wallet, contractId, methods]);

  const callMethod = useCallback(async (
    methodName: string,
    args?: any,
    options?: CallMethodOptions
  ) => {
    if (!state.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      // Call the contract method
      const result = await (state.contract as any)[methodName](
        args || {},
        options?.gas || '300000000000000', // 300 TGas default
        options?.deposit || '0'
      );
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [state.contract]);

  const viewMethod = useCallback(async (
    methodName: string,
    args?: any
  ) => {
    if (!state.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      // Call the view method
      const result = await (state.contract as any)[methodName](args || {});
      return result;
    } catch (error) {
      throw error;
    }
  }, [state.contract]);

  return {
    ...state,
    callMethod,
    viewMethod,
  };
}