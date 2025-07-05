# 🚀 NEAR React Hooks

A comprehensive TypeScript React hooks library that dramatically simplifies NEAR Protocol blockchain interactions from 50+ lines to just 3 lines.

[![npm version](https://badge.fury.io/js/near-react-hooks.svg)](https://badge.fury.io/js/near-react-hooks)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/near-react-hooks/near-react-hooks/badge.svg?branch=main)](https://coveralls.io/github/near-react-hooks/near-react-hooks?branch=main)

## ✨ What Makes This Special

Transform complex NEAR Protocol interactions into simple, reusable React hooks:

```typescript
// Before: 50+ lines of boilerplate
const handleConnect = async () => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const config = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };
  const near = await connect(config);
  const wallet = new WalletConnection(near, 'app');
  // ... more setup code
};

// After: 3 lines with NEAR React Hooks
const { signIn, signOut, accountId, isConnected } = useNearWallet();
```

## 🎯 Key Features

- **🎪 Simple API** - Reduce 50+ lines to 3 lines of code
- **🔒 TypeScript First** - Full type safety and IntelliSense support
- **⚡ Performance Optimized** - Efficient re-renders and state management
- **🛡️ Error Handling** - Built-in error boundaries and graceful failures
- **🧪 Fully Tested** - 100% test coverage with Jest and React Testing Library
- **📖 Great Documentation** - Comprehensive guides and examples
- **🎨 Developer Experience** - Zero configuration, works out of the box

## 📦 Installation

```bash
npm install near-react-hooks
# or
yarn add near-react-hooks
# or
pnpm add near-react-hooks
```

## 🚀 Quick Start

### 1. Wrap your app with the NEAR Provider

```typescript
import { NearProvider } from 'near-react-hooks';

function App() {
  return (
    <NearProvider>
      <YourApp />
    </NearProvider>
  );
}
```

### 2. Use the hooks in your components

```typescript
import { useNearWallet } from 'near-react-hooks';

function WalletButton() {
  const { signIn, signOut, accountId, isConnected, loading } = useNearWallet();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected as: {accountId}</p>
          <button onClick={signOut}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Connect Wallet</button>
      )}
    </div>
  );
}
```

## 🔧 Available Hooks

### 🔐 useNearWallet

Manage wallet connections and authentication:

```typescript
const {
  signIn,           // Function to connect wallet
  signOut,          // Function to disconnect wallet
  accountId,        // Current account ID
  isConnected,      // Connection status
  loading,          // Loading state
  error             // Error state
} = useNearWallet();
```

### 👤 useNearAccount

Access account information and balance:

```typescript
const {
  account,          // Account object
  balance,          // Account balance in NEAR
  accountId,        // Account ID
  loading,          // Loading state
  error             // Error state
} = useNearAccount();
```

### 📄 useNearContract

Interact with smart contracts:

```typescript
const {
  callMethod,       // Call contract change methods
  viewMethod,       // Call contract view methods
  contract,         // Contract instance
  loading,          // Loading state
  error             // Error state
} = useNearContract('contract.testnet', {
  viewMethods: ['getMessage'],
  changeMethods: ['setMessage']
});

// Call a view method
const message = await viewMethod('getMessage');

// Call a change method
await callMethod('setMessage', { message: 'Hello NEAR!' });
```

### 📊 useNearTransaction

Track transaction status:

```typescript
const {
  status,           // Transaction status
  loading,          // Loading state
  error,            // Error state
  receipt           // Transaction receipt
} = useNearTransaction(transactionHash);
```

## 🎨 Configuration

### Custom Network Configuration

```typescript
import { NearProvider } from 'near-react-hooks';

const config = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
};

function App() {
  return (
    <NearProvider config={config}>
      <YourApp />
    </NearProvider>
  );
}
```

## 📚 Examples

### Simple Wallet Connection

```typescript
import { useNearWallet } from 'near-react-hooks';

function WalletConnection() {
  const { signIn, signOut, accountId, isConnected, loading } = useNearWallet();

  if (loading) return <div>Connecting...</div>;

  return (
    <div>
      {isConnected ? (
        <div>
          <h3>Welcome {accountId}!</h3>
          <button onClick={signOut}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Connect NEAR Wallet</button>
      )}
    </div>
  );
}
```

### Token Balance Checker

```typescript
import { useNearWallet, useNearAccount } from 'near-react-hooks';

function TokenBalance() {
  const { isConnected } = useNearWallet();
  const { balance, loading, error } = useNearAccount();

  if (!isConnected) return <div>Please connect your wallet</div>;
  if (loading) return <div>Loading balance...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Your Balance</h3>
      <p>{balance} NEAR</p>
    </div>
  );
}
```

### Smart Contract Interaction

```typescript
import { useNearContract } from 'near-react-hooks';

function GreetingContract() {
  const { callMethod, viewMethod, loading } = useNearContract(
    'hello.near-examples.testnet',
    {
      viewMethods: ['get_greeting'],
      changeMethods: ['set_greeting']
    }
  );

  const [greeting, setGreeting] = useState('');
  const [newGreeting, setNewGreeting] = useState('');

  const fetchGreeting = async () => {
    const result = await viewMethod('get_greeting');
    setGreeting(result);
  };

  const updateGreeting = async () => {
    await callMethod('set_greeting', { message: newGreeting });
    fetchGreeting();
  };

  return (
    <div>
      <h3>Current Greeting: {greeting}</h3>
      <input
        value={newGreeting}
        onChange={(e) => setNewGreeting(e.target.value)}
        placeholder="Enter new greeting"
      />
      <button onClick={updateGreeting} disabled={loading}>
        Update Greeting
      </button>
    </div>
  );
}
```

## 🔍 API Reference

### NearProvider Props

```typescript
interface NearProviderProps {
  children: React.ReactNode;
  config?: NearConfig;
}
```

### NearConfig Interface

```typescript
interface NearConfig {
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
  contractName?: string;
}
```

### Hook Return Types

All hooks return objects with consistent patterns:

```typescript
interface HookState {
  loading: boolean;
  error: string | null;
  // Hook-specific properties
}
```

## 🧪 Testing

The library includes comprehensive testing utilities:

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useNearWallet } from 'near-react-hooks';

test('should connect wallet', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useNearWallet());
  
  act(() => {
    result.current.signIn();
  });

  await waitForNextUpdate();
  expect(result.current.isConnected).toBe(true);
});
```

## 🔧 Troubleshooting

### Common Issues

**Issue: "WalletConnection is not defined"**
```typescript
// Make sure to wrap your app with NearProvider
<NearProvider>
  <App />
</NearProvider>
```

**Issue: "Network connection failed"**
```typescript
// Check your network configuration
const config = {
  networkId: 'testnet', // or 'mainnet'
  nodeUrl: 'https://rpc.testnet.near.org',
  // ... other config
};
```

**Issue: "Transaction failed"**
```typescript
// Always handle errors in your components
const { callMethod, error } = useNearContract(contractId, methods);

if (error) {
  console.error('Contract error:', error);
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/near-react-hooks/near-react-hooks.git

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build
```

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NEAR Protocol](https://near.org/) for the amazing blockchain platform
- [React](https://reactjs.org/) for the fantastic UI library
- All contributors who help improve this library

## 📞 Support

- 📖 [Documentation](https://near-react-hooks.dev)
- 💬 [Discord](https://discord.gg/near)
- 🐛 [Issues](https://github.com/near-react-hooks/near-react-hooks/issues)
- 💡 [Discussions](https://github.com/near-react-hooks/near-react-hooks/discussions)

---

**Made with ❤️ by the NEAR React Hooks team**