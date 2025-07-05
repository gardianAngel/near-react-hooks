import { useState, useEffect, useCallback } from "react";
import { useNearWallet } from "./use-near-wallet";
import { ContractState, ContractMethods, CallMethodOptions } from "./types";

export function useNearContract(contractId: string, methods?: ContractMethods) {
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
        
        // Mock contract initialization for demo
        // In production, this would create a Contract instance from near-api-js
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const mockContract = {
          contractId,
          methods: methods || { viewMethods: [], changeMethods: [] },
          callMethod: async (methodName: string, args?: any) => {
            console.log(`Calling ${methodName} with args:`, args);
            return { success: true, result: "Mock result" };
          },
          viewMethod: async (methodName: string, args?: any) => {
            console.log(`Viewing ${methodName} with args:`, args);
            return "Mock view result";
          },
        };

        setState({
          contract: mockContract,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to initialize contract",
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
      throw new Error("Contract not initialized");
    }

    try {
      // Mock contract call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await state.contract.callMethod(methodName, args);
    } catch (error) {
      throw error;
    }
  }, [state.contract]);

  const viewMethod = useCallback(async (
    methodName: string,
    args?: any
  ) => {
    if (!state.contract) {
      throw new Error("Contract not initialized");
    }

    try {
      // Mock contract view for demo
      await new Promise(resolve => setTimeout(resolve, 300));
      return await state.contract.viewMethod(methodName, args);
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
