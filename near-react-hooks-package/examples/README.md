# NEAR React Hooks Examples

This directory contains comprehensive examples demonstrating the capabilities of the NEAR React Hooks library. Each example shows how to transform complex NEAR Protocol operations from 50+ lines of boilerplate code into just 3 lines.

## Available Examples

### 1. [Simple Wallet Connection](./1-simple-wallet-connection/)
**Demonstrates:** Basic wallet connection and authentication
- Connect/disconnect NEAR wallet
- Display connection status and account information
- Handle loading and error states
- **Code reduction:** 50+ lines → 3 lines

### 2. [Token Balance Checker](./2-token-balance-checker/)
**Demonstrates:** Account balance fetching and token operations
- Check NEAR token balances
- Display account information
- Handle real-time balance updates
- **Code reduction:** 80+ lines → 3 lines

### 3. [Smart Contract Interaction](./3-smart-contract-interaction/)
**Demonstrates:** Full smart contract integration
- Call view methods (read-only operations)
- Call change methods (state-changing operations)
- Monitor transaction status
- Handle transaction receipts
- **Code reduction:** 120+ lines → 3 lines

## Quick Start

### Installation

```bash
npm install near-react-hooks
```

### Basic Setup

```typescript
import { NearProvider } from 'near-react-hooks';

function App() {
  return (
    <NearProvider>
      <YourComponents />
    </NearProvider>
  );
}
```

### Using the Hooks

```typescript
import { useNearWallet, useNearAccount, useNearContract, useNearTransaction } from 'near-react-hooks';

function YourComponent() {
  // Wallet connection
  const { signIn, signOut, accountId, isConnected } = useNearWallet();
  
  // Account information
  const { balance, loading, error } = useNearAccount();
  
  // Contract interaction
  const { callMethod, viewMethod } = useNearContract('contract.testnet', {
    viewMethods: ['get_data'],
    changeMethods: ['set_data']
  });
  
  // Transaction monitoring
  const { status, receipt } = useNearTransaction(txHash);
  
  // Your application logic here
}
```

## Running the Examples

### Prerequisites

- Node.js 14 or higher
- npm or yarn
- NEAR wallet (for testing)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/near-react-hooks.git
   cd near-react-hooks
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run a specific example:**
   ```bash
   # Navigate to the example directory
   cd examples/1-simple-wallet-connection
   
   # Install example dependencies
   npm install
   
   # Start the development server
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the example in action

## Configuration

### Network Configuration

By default, examples use the NEAR testnet. To use mainnet or custom configuration:

```typescript
<NearProvider config={{
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org'
}}>
  <App />
</NearProvider>
```

### Contract Configuration

For smart contract examples, you can modify the contract ID:

```typescript
const { callMethod, viewMethod } = useNearContract('your-contract.testnet', {
  viewMethods: ['your_view_method'],
  changeMethods: ['your_change_method']
});
```

## Key Benefits Demonstrated

### 1. **Dramatic Code Reduction**
- Traditional NEAR integration: 50-120 lines
- With NEAR React Hooks: 3 lines
- **Reduction: Up to 95% less code**

### 2. **Automatic State Management**
- No manual state management for loading, error, and connection states
- Built-in React patterns and best practices
- Automatic updates and re-renders

### 3. **TypeScript Support**
- Full type safety out of the box
- Intelligent code completion
- Compile-time error checking

### 4. **React-Friendly Design**
- Built specifically for React applications
- Follows React hooks patterns
- Compatible with React 16.8+

### 5. **Comprehensive Error Handling**
- Automatic error catching and state management
- User-friendly error messages
- Network and connection error handling

## Example Comparison

### Before (Traditional NEAR API)
```typescript
// 50+ lines of boilerplate code
const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  keyStore: new keyStores.BrowserLocalStorageKeyStore()
};

const near = await connect(nearConfig);
const wallet = new WalletConnection(near, 'my-app');

// Manual state management
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [connected, setConnected] = useState(false);

// Manual initialization
useEffect(() => {
  initializeWallet();
}, []);

// Plus many more lines for error handling, state updates, etc.
```

### After (NEAR React Hooks)
```typescript
// 3 lines of code
const { signIn, signOut, accountId, isConnected, loading, error } = useNearWallet();

// That's it! Everything is handled automatically
```

## Common Use Cases

The examples cover the most common NEAR Protocol use cases:

- **DeFi Applications:** Token balances, transfers, staking
- **NFT Marketplaces:** Minting, trading, metadata queries
- **Gaming Applications:** Player actions, leaderboards, achievements
- **Social Applications:** Posts, likes, follows, reputation
- **Governance Tools:** Voting, proposals, delegation
- **DApps:** Any decentralized application requiring NEAR integration

## Best Practices

1. **Always wrap your app with NearProvider**
2. **Check connection status before calling methods**
3. **Handle loading and error states appropriately**
4. **Use view methods for read-only operations (no gas cost)**
5. **Monitor transaction status for change methods**
6. **Validate user inputs before calling contract methods**

## Support

- **Documentation:** [Main README](../README.md)
- **Issues:** [GitHub Issues](https://github.com/your-username/near-react-hooks/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-username/near-react-hooks/discussions)
- **NEAR Community:** [NEAR Discord](https://discord.gg/near)

## Contributing

We welcome contributions! Please read our [Contributing Guide](../CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.