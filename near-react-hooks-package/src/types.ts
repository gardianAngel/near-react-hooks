export interface NearConfig {
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
  contractName?: string;
}

export interface WalletState {
  wallet: any;
  accountId: string | null;
  isConnected: boolean;
  loading: boolean;
  error: string | null;
}

export interface ContractState {
  contract: any;
  loading: boolean;
  error: string | null;
}

export interface AccountState {
  account: any;
  balance: string | null;
  accountId: string | null;
  loading: boolean;
  error: string | null;
}

export interface TransactionState {
  status: 'pending' | 'success' | 'failure' | null;
  loading: boolean;
  error: string | null;
  receipt: any;
}

export interface ContractMethods {
  viewMethods?: string[];
  changeMethods?: string[];
}

export interface CallMethodOptions {
  args?: any;
  gas?: string;
  deposit?: string;
}