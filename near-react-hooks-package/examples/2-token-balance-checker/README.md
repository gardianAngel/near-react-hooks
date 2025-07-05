# Token Balance Checker Example

This example demonstrates how to check account balances and handle token transfers using NEAR React Hooks.

## Features

- Check NEAR token balance
- Display account information
- Send tokens to other accounts
- Handle transaction states
- Real-time balance updates
- Error handling and loading states

## Code Overview

### Traditional NEAR Implementation (80+ lines)

```typescript
import { connect, WalletConnection, keyStores, utils } from 'near-api-js';

const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  keyStore: new keyStores.BrowserLocalStorageKeyStore()
};

// Initialize connection
const near = await connect(nearConfig);
const wallet = new WalletConnection(near, 'my-app');

// Get account balance
const getBalance = async (accountId) => {
  try {
    const account = await near.account(accountId);
    const balance = await account.getAccountBalance();
    return utils.format.formatNearAmount(balance.available);
  } catch (error) {
    console.error('Error getting balance:', error);
    return null;
  }
};

// Send tokens
const sendTokens = async (receiverId, amount) => {
  try {
    const account = await near.account(wallet.getAccountId());
    const result = await account.sendMoney(
      receiverId,
      utils.format.parseNearAmount(amount)
    );
    return result;
  } catch (error) {
    console.error('Error sending tokens:', error);
    throw error;
  }
};

// Component with state management
function TokenBalanceChecker() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  useEffect(() => {
    if (wallet.isSignedIn()) {
      loadBalance();
    }
  }, []);

  const loadBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      const bal = await getBalance(wallet.getAccountId());
      setBalance(bal);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendTokens = async (recipient, amount) => {
    try {
      setSending(true);
      setSendError(null);
      await sendTokens(recipient, amount);
      // Refresh balance after sending
      await loadBalance();
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  // ... rest of component logic
}
```

### NEAR React Hooks Implementation (3 lines)

```typescript
import { useNearWallet, useNearAccount } from 'near-react-hooks';

function TokenBalanceChecker() {
  const { accountId, isConnected } = useNearWallet();
  const { balance, loading, error } = useNearAccount();
  
  // That's it! Balance is automatically fetched and updated
  return (
    <div>
      {isConnected && (
        <div>
          <p>Account: {accountId}</p>
          <p>Balance: {balance} NEAR</p>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </div>
      )}
    </div>
  );
}
```

## Usage

1. **Install the package:**
   ```bash
   npm install near-react-hooks
   ```

2. **Wrap your app with NearProvider:**
   ```typescript
   import { NearProvider } from 'near-react-hooks';
   
   function App() {
     return (
       <NearProvider>
         <TokenBalanceChecker />
       </NearProvider>
     );
   }
   ```

3. **Use the hooks:**
   ```typescript
   import { useNearWallet, useNearAccount } from 'near-react-hooks';
   
   function TokenBalanceChecker() {
     const { accountId, isConnected } = useNearWallet();
     const { balance, loading, error } = useNearAccount();
     
     // Your balance checking logic here
   }
   ```

## API Reference

### useNearAccount()

Returns an object with the following properties:

- `account` - NEAR account object
- `balance` - Account balance in NEAR tokens
- `accountId` - Account ID (same as from useNearWallet)
- `loading` - Boolean indicating loading state
- `error` - Error message if balance fetch fails

### useNearWallet()

Returns wallet connection state and methods:

- `accountId` - Connected account ID
- `isConnected` - Boolean indicating connection status
- `signIn()` - Connect to wallet
- `signOut()` - Disconnect from wallet
- `loading` - Boolean indicating loading state
- `error` - Error message if connection fails

## Token Transfer Integration

For token transfers, you can integrate with the contract hook:

```typescript
import { useNearWallet, useNearAccount, useNearContract } from 'near-react-hooks';

function TokenTransfer() {
  const { accountId, isConnected } = useNearWallet();
  const { balance } = useNearAccount();
  const { callMethod } = useNearContract();
  
  const sendTokens = async (recipient, amount) => {
    // This would use the wallet's sendMoney method
    // Implementation depends on your specific requirements
  };
  
  return (
    <div>
      <p>Current Balance: {balance} NEAR</p>
      {/* Transfer form here */}
    </div>
  );
}
```

## Configuration

For mainnet or custom configuration:

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

## Running the Example

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open your browser and navigate to the example
5. Connect your wallet to see balance information
6. Try sending tokens to test the transfer functionality

## Key Benefits

- **Automatic balance fetching** - No need to manually fetch and update balances
- **Real-time updates** - Balance updates automatically when transactions occur
- **Error handling** - Built-in error states and loading indicators
- **Type safety** - Full TypeScript support with proper type definitions
- **React-friendly** - Follows React best practices and hooks patterns
- **Reduces complexity** - From 80+ lines to 3 lines of code

## Error Handling

The hooks provide comprehensive error handling:

- Network connection errors
- Account not found errors
- Balance fetch failures
- Transaction failures
- Loading states for all operations

All errors are automatically caught and provided through the hook's error state.