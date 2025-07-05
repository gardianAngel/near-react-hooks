# NEAR React Hooks - Interface Design Proposal

## Overview

This proposal outlines the interface design for `near-react-hooks`, a TypeScript React hooks library that simplifies NEAR Protocol integration from 50+ lines to 3 lines of code.

**Goal**: Provide intuitive, React-native hooks that handle NEAR Protocol complexity while maintaining type safety and developer experience.

## Core Philosophy

1. **React-First**: Follow React patterns and best practices
2. **Minimal Boilerplate**: Common operations should be 1-3 lines
3. **Type Safety**: Full TypeScript support with proper inference
4. **Error Handling**: Built-in error states and loading indicators
5. **Production Ready**: Handle edge cases, reconnections, and state management

## Interface Examples

### 1. Basic Wallet Connection

**Current NEAR SDK (50+ lines):**
```typescript
import { connect, keyStores, WalletConnection } from 'near-api-js';

const nearConfig = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
};

const near = await connect(nearConfig);
const wallet = new WalletConnection(near, null);

function WalletConnector() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsConnected(wallet.isSignedIn());
    if (wallet.isSignedIn()) {
      setAccountId(wallet.getAccountId());
    }
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      await wallet.requestSignIn();
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    wallet.signOut();
    setIsConnected(false);
    setAccountId(null);
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected as: {accountId}</p>
          <button onClick={signOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      ) : (
        <button onClick={signIn} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}
```

**Proposed near-react-hooks (3 lines):**
```typescript
import { useNearWallet } from 'near-react-hooks';

function WalletConnector() {
  const { signIn, signOut, accountId, isConnected, loading } = useNearWallet();

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected as: {accountId}</p>
          <button onClick={signOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      ) : (
        <button onClick={signIn} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}
```

### 2. Account Balance Display

**Current NEAR SDK (30+ lines):**
```typescript
function AccountBalance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (wallet.isSignedIn()) {
      fetchBalance();
    }
  }, []);

  const fetchBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const account = wallet.account();
      const balance = await account.getAccountBalance();
      setBalance(balance.available);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading balance...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!balance) return <div>No balance data</div>;

  return <div>Balance: {balance} NEAR</div>;
}
```

**Proposed near-react-hooks (1 line):**
```typescript
import { useNearAccount } from 'near-react-hooks';

function AccountBalance() {
  const { balance, loading, error } = useNearAccount();

  if (loading) return <div>Loading balance...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!balance) return <div>No balance data</div>;

  return <div>Balance: {balance} NEAR</div>;
}
```

### 3. Smart Contract Interaction

**Current NEAR SDK (40+ lines):**
```typescript
function ContractInteraction() {
  const [contract, setContract] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (wallet.isSignedIn()) {
      initContract();
    }
  }, []);

  const initContract = async () => {
    try {
      const account = wallet.account();
      const contract = new Contract(account, 'hello.testnet', {
        viewMethods: ['get_greeting'],
        changeMethods: ['set_greeting'],
      });
      setContract(contract);
    } catch (err) {
      setError(err.message);
    }
  };

  const callMethod = async (methodName, args = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await contract[methodName](args);
      setResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => callMethod('get_greeting')} disabled={loading}>
        Get Greeting
      </button>
      {result && <div>Result: {result}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
```

**Proposed near-react-hooks (2 lines):**
```typescript
import { useNearContract } from 'near-react-hooks';

function ContractInteraction() {
  const { callMethod, loading, error } = useNearContract('hello.testnet', {
    viewMethods: ['get_greeting'],
    changeMethods: ['set_greeting'],
  });

  const handleGetGreeting = async () => {
    const result = await callMethod('get_greeting');
    console.log('Greeting:', result);
  };

  return (
    <div>
      <button onClick={handleGetGreeting} disabled={loading}>
        Get Greeting
      </button>
      {error && <div>Error: {error}</div>}
    </div>
  );
}
```

### 4. Transaction Monitoring

**Current NEAR SDK (35+ lines):**
```typescript
function TransactionMonitor() {
  const [txHash, setTxHash] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (txHash) {
      monitorTransaction();
    }
  }, [txHash]);

  const monitorTransaction = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = wallet.account().connection.provider;
      const result = await provider.txStatus(txHash, wallet.getAccountId());
      setStatus(result.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendTransaction = async () => {
    setLoading(true);
    try {
      // Transaction logic here
      const result = await someTransaction();
      setTxHash(result.transaction.hash);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={sendTransaction}>Send Transaction</button>
      {status && <div>Status: {status}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
```

**Proposed near-react-hooks (1 line):**
```typescript
import { useNearTransaction } from 'near-react-hooks';

function TransactionMonitor({ transactionHash }) {
  const { status, loading, error, receipt } = useNearTransaction(transactionHash);

  if (loading) return <div>Monitoring transaction...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!status) return <div>Transaction not found</div>;

  return (
    <div>
      <div>Status: {status}</div>
      {receipt && <div>Receipt: {JSON.stringify(receipt, null, 2)}</div>}
    </div>
  );
}
```

### 5. Complete DApp Example

**Proposed near-react-hooks (Full DApp in 15 lines):**
```typescript
import { NearProvider, useNearWallet, useNearAccount, useNearContract } from 'near-react-hooks';

function App() {
  return (
    <NearProvider network="testnet">
      <WalletSection />
      <AccountSection />
      <ContractSection />
    </NearProvider>
  );
}

function WalletSection() {
  const { signIn, signOut, accountId, isConnected, loading } = useNearWallet();
  
  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {accountId}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signIn} disabled={loading}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

function AccountSection() {
  const { balance, loading, error } = useNearAccount();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>Balance: {balance} NEAR</div>;
}

function ContractSection() {
  const { callMethod, loading } = useNearContract('hello.testnet', {
    viewMethods: ['get_greeting'],
    changeMethods: ['set_greeting'],
  });
  
  const handleCall = () => callMethod('get_greeting');
  
  return (
    <button onClick={handleCall} disabled={loading}>
      Get Greeting
    </button>
  );
}
```

## Hook Interface Specifications

### `useNearWallet()`
```typescript
interface WalletHookReturn {
  // State
  accountId: string | null;
  isConnected: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  signIn: (contractId?: string, methodNames?: string[]) => Promise<void>;
  signOut: () => void;
  
  // Wallet instance (for advanced use)
  wallet: WalletConnection | null;
}
```

### `useNearAccount()`
```typescript
interface AccountHookReturn {
  // State
  account: Account | null;
  balance: string | null;
  accountId: string | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  refreshBalance: () => Promise<void>;
}
```

### `useNearContract(contractId, methods)`
```typescript
interface ContractHookReturn {
  // State
  contract: Contract | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  callMethod: (methodName: string, args?: any, options?: CallOptions) => Promise<any>;
}

interface CallOptions {
  gas?: string;
  deposit?: string;
}
```

### `useNearTransaction(transactionHash)`
```typescript
interface TransactionHookReturn {
  // State
  status: 'pending' | 'success' | 'failure' | null;
  loading: boolean;
  error: string | null;
  receipt: any;
  
  // Actions
  refresh: () => Promise<void>;
}
```

## Configuration

### Provider Setup
```typescript
import { NearProvider } from 'near-react-hooks';

function App() {
  return (
    <NearProvider 
      network="testnet" // or "mainnet"
      config={{
        contractName: 'my-contract.testnet',
        // Additional config options
      }}
    >
      <MyApp />
    </NearProvider>
  );
}
```

### Custom Configuration
```typescript
<NearProvider 
  config={{
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  }}
>
  <MyApp />
</NearProvider>
```

## Error Handling Patterns

### Global Error Handling
```typescript
function MyComponent() {
  const { error } = useNearWallet();
  
  if (error) {
    return <ErrorBoundary error={error} />;
  }
  
  // Component logic
}
```

### Async Error Handling
```typescript
function MyComponent() {
  const { callMethod } = useNearContract('contract.testnet');
  
  const handleCall = async () => {
    try {
      const result = await callMethod('my_method');
      console.log('Success:', result);
    } catch (error) {
      console.error('Failed:', error);
    }
  };
}
```

## Questions for Community Review

1. **Hook Naming**: Do the hook names (`useNearWallet`, `useNearAccount`, etc.) clearly convey their purpose?

2. **Return Value Structure**: Are the returned objects intuitive? Should we use arrays like `[state, actions]` instead?

3. **Error Handling**: Is the error handling approach sufficient for production apps?

4. **Configuration**: Is the provider configuration flexible enough for different use cases?

5. **TypeScript Support**: Are the TypeScript interfaces comprehensive enough?

6. **Performance**: Any concerns about re-renders or state management?

7. **Advanced Use Cases**: What additional patterns should we support?

8. **Migration Path**: How can developers migrate from current NEAR SDK?

## Implementation Priority

1. **Phase 1**: Basic wallet connection and account management
2. **Phase 2**: Contract interaction and transaction monitoring
3. **Phase 3**: Advanced features (batch transactions, relayer support)
4. **Phase 4**: Developer experience improvements (DevTools, debugging)

---

**Please provide feedback on this interface design before implementation begins.**

This proposal focuses on the developer experience and API design rather than implementation details. The goal is to validate that these interfaces will meet real-world needs before writing the actual code.