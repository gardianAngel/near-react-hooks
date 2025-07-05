# Simple Wallet Connection Example

This example demonstrates the basic wallet connection functionality using NEAR React Hooks.

## Features

- Connect/disconnect NEAR wallet
- Display connection status
- Show account information
- Handle loading and error states
- User-friendly interface with clear feedback

## Code Overview

### Traditional NEAR Implementation (50+ lines)

```typescript
import { connect, WalletConnection, keyStores } from 'near-api-js';

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

// Check if signed in
const isSignedIn = wallet.isSignedIn();
const accountId = wallet.getAccountId();

// Sign in
const signIn = () => {
  wallet.requestSignIn({
    contractId: 'my-contract.testnet',
    methodNames: ['some_method'],
    successUrl: window.location.origin,
    failureUrl: window.location.origin
  });
};

// Sign out
const signOut = () => {
  wallet.signOut();
  window.location.reload();
};

// Component with state management
function WalletConnection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    initializeWallet();
  }, []);

  const initializeWallet = async () => {
    try {
      setLoading(true);
      // ... wallet initialization logic
      setConnected(isSignedIn);
      setAccount(accountId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component logic
}
```

### NEAR React Hooks Implementation (3 lines)

```typescript
import { useNearWallet } from 'near-react-hooks';

function WalletConnection() {
  const { signIn, signOut, accountId, isConnected, loading, error } = useNearWallet();
  
  // That's it! All wallet functionality is now available
  return (
    <div>
      {isConnected ? (
        <button onClick={signOut}>Disconnect {accountId}</button>
      ) : (
        <button onClick={() => signIn()}>Connect Wallet</button>
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
         <WalletConnection />
       </NearProvider>
     );
   }
   ```

3. **Use the hook:**
   ```typescript
   import { useNearWallet } from 'near-react-hooks';
   
   function WalletConnection() {
     const { signIn, signOut, accountId, isConnected, loading, error } = useNearWallet();
     
     // Your wallet connection logic here
   }
   ```

## API Reference

### useNearWallet()

Returns an object with the following properties:

- `signIn(contractId?: string)` - Connect to NEAR wallet
- `signOut()` - Disconnect from wallet
- `accountId` - Connected account ID (null if not connected)
- `isConnected` - Boolean indicating connection status
- `loading` - Boolean indicating loading state
- `error` - Error message if connection fails

## Configuration

The NearProvider uses testnet by default. For mainnet or custom configuration:

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
5. Click "Connect NEAR Wallet" to test the functionality

## Key Benefits

- **Reduces boilerplate code by 95%** - From 50+ lines to 3 lines
- **Automatic state management** - No need to manage loading, error, and connection states
- **TypeScript support** - Full type safety out of the box
- **React-friendly** - Built specifically for React applications
- **Easy to use** - Simple, intuitive API that follows React best practices