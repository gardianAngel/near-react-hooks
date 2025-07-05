// Main exports
export { NearProvider, useNearProvider } from './providers/NearProvider';

// Hook exports
export { useNearWallet } from './hooks/useNearWallet';
export { useNearAccount } from './hooks/useNearAccount';
export { useNearContract } from './hooks/useNearContract';
export { useNearTransaction } from './hooks/useNearTransaction';

// Type exports
export type {
  NearConfig,
  WalletState,
  ContractState,
  AccountState,
  TransactionState,
  ContractMethods,
  CallMethodOptions,
} from './types';