# Smart Contract Interaction Example

This example demonstrates how to interact with NEAR smart contracts using NEAR React Hooks, including both view and change methods.

## Features

- Connect to any NEAR smart contract
- Call view methods (read-only operations)
- Call change methods (state-changing operations)
- Monitor transaction status
- Handle loading states and errors
- Display transaction receipts

## Code Overview

### Traditional NEAR Implementation (120+ lines)

```typescript
import { connect, WalletConnection, keyStores, Contract } from 'near-api-js';

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

// Contract setup
const contractId = 'hello.near-examples.testnet';
const contractMethods = {
  viewMethods: ['get_greeting'],
  changeMethods: ['set_greeting']
};

// Initialize contract
const initializeContract = async () => {
  const account = wallet.account();
  const contract = new Contract(account, contractId, contractMethods);
  return contract;
};

// Call view method
const callViewMethod = async (methodName, args = {}) => {
  try {
    const contract = await initializeContract();
    const result = await contract[methodName](args);
    return result;
  } catch (error) {
    console.error('View method error:', error);
    throw error;
  }
};

// Call change method
const callChangeMethod = async (methodName, args = {}, options = {}) => {
  try {
    const contract = await initializeContract();
    const result = await contract[methodName](
      args,
      options.gas || '30000000000000',
      options.deposit || '0'
    );
    return result;
  } catch (error) {
    console.error('Change method error:', error);
    throw error;
  }
};

// Monitor transaction
const monitorTransaction = async (txHash) => {
  try {
    const result = await near.connection.provider.txStatus(txHash, wallet.getAccountId());
    return result;
  } catch (error) {
    console.error('Transaction monitoring error:', error);
    throw error;
  }
};

// Component with state management
function SmartContractInteraction() {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [txHash, setTxHash] = useState('');
  const [txStatus, setTxStatus] = useState(null);
  const [txLoading, setTxLoading] = useState(false);

  useEffect(() => {
    if (wallet.isSignedIn()) {
      initContract();
    }
  }, []);

  const initContract = async () => {
    try {
      setLoading(true);
      setError(null);
      const contractInstance = await initializeContract();
      setContract(contractInstance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetGreeting = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await callViewMethod('get_greeting');
      setGreeting(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetGreeting = async (newGreeting) => {
    try {
      setLoading(true);
      setError(null);
      const result = await callChangeMethod('set_greeting', { message: newGreeting });
      setTxHash(result.transaction.hash);
      // Start monitoring transaction
      monitorTx(result.transaction.hash);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const monitorTx = async (hash) => {
    try {
      setTxLoading(true);
      // Poll for transaction status
      const pollInterval = setInterval(async () => {
        try {
          const status = await monitorTransaction(hash);
          if (status.status && status.status.SuccessValue !== undefined) {
            setTxStatus('success');
            clearInterval(pollInterval);
            setTxLoading(false);
          } else if (status.status && status.status.Failure) {
            setTxStatus('failure');
            clearInterval(pollInterval);
            setTxLoading(false);
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 2000);
    } catch (err) {
      console.error('Transaction monitoring error:', err);
      setTxLoading(false);
    }
  };

  // ... rest of component logic
}
```

### NEAR React Hooks Implementation (3 lines)

```typescript
import { useNearWallet, useNearContract, useNearTransaction } from 'near-react-hooks';

function SmartContractInteraction() {
  const { isConnected } = useNearWallet();
  const { callMethod, viewMethod, loading, error } = useNearContract('hello.near-examples.testnet', {
    viewMethods: ['get_greeting'],
    changeMethods: ['set_greeting']
  });
  
  // That's it! Contract interaction is now available
  const handleGetGreeting = async () => {
    const result = await viewMethod('get_greeting');
    console.log('Greeting:', result);
  };
  
  const handleSetGreeting = async (message) => {
    const txHash = await callMethod('set_greeting', { message });
    console.log('Transaction hash:', txHash);
  };
  
  return (
    <div>
      {isConnected && (
        <div>
          <button onClick={handleGetGreeting}>Get Greeting</button>
          <button onClick={() => handleSetGreeting('Hello NEAR!')}>Set Greeting</button>
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
         <SmartContractInteraction />
       </NearProvider>
     );
   }
   ```

3. **Use the hooks:**
   ```typescript
   import { useNearWallet, useNearContract, useNearTransaction } from 'near-react-hooks';
   
   function SmartContractInteraction() {
     const { isConnected } = useNearWallet();
     const { callMethod, viewMethod, loading, error } = useNearContract(
       'your-contract.testnet',
       {
         viewMethods: ['get_data'],
         changeMethods: ['set_data']
       }
     );
     
     // Your contract interaction logic here
   }
   ```

## API Reference

### useNearContract(contractId, methods)

**Parameters:**
- `contractId` - The NEAR contract account ID
- `methods` - Object defining available methods:
  - `viewMethods` - Array of read-only method names
  - `changeMethods` - Array of state-changing method names

**Returns:**
- `callMethod(methodName, args?, options?)` - Execute a change method
- `viewMethod(methodName, args?)` - Execute a view method
- `loading` - Boolean indicating loading state
- `error` - Error message if operation fails

### useNearTransaction(transactionHash)

**Parameters:**
- `transactionHash` - Hash of the transaction to monitor

**Returns:**
- `status` - Transaction status ('pending', 'success', 'failure', or null)
- `loading` - Boolean indicating monitoring state
- `error` - Error message if monitoring fails
- `receipt` - Transaction receipt object

## Method Call Options

For change methods, you can pass additional options:

```typescript
const result = await callMethod('set_greeting', 
  { message: 'Hello!' }, // method arguments
  { 
    gas: '30000000000000', // gas limit
    deposit: '0' // attached deposit in yoctoNEAR
  }
);
```

## Transaction Monitoring

Monitor transaction status after calling change methods:

```typescript
function ContractWithTransactionMonitoring() {
  const [txHash, setTxHash] = useState('');
  const { callMethod } = useNearContract('hello.near-examples.testnet', {
    changeMethods: ['set_greeting']
  });
  const { status, loading, receipt } = useNearTransaction(txHash);
  
  const handleSetGreeting = async (message) => {
    const hash = await callMethod('set_greeting', { message });
    setTxHash(hash);
  };
  
  return (
    <div>
      <button onClick={() => handleSetGreeting('Hello!')}>Set Greeting</button>
      {loading && <p>Transaction pending...</p>}
      {status === 'success' && <p>Transaction successful!</p>}
      {status === 'failure' && <p>Transaction failed</p>}
    </div>
  );
}
```

## Error Handling

All hooks provide comprehensive error handling:

```typescript
const { callMethod, viewMethod, loading, error } = useNearContract(contractId, methods);

if (error) {
  console.error('Contract error:', error);
  // Handle error appropriately
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
5. Connect your wallet
6. Try calling view methods (no gas required)
7. Try calling change methods (requires gas and wallet approval)

## Key Benefits

- **Massive code reduction** - From 120+ lines to 3 lines
- **Automatic contract initialization** - No need to manually set up contracts
- **Built-in transaction monitoring** - Automatic status tracking
- **Type safety** - Full TypeScript support with proper type definitions
- **Error handling** - Comprehensive error states and loading indicators
- **React-friendly** - Follows React best practices and hooks patterns
- **Flexible method calling** - Support for both view and change methods with options

## Common Use Cases

- **DeFi applications** - Token transfers, staking, lending
- **NFT marketplaces** - Minting, trading, metadata queries
- **Gaming** - Player actions, leaderboards, achievements
- **Social applications** - Posts, likes, follows
- **Governance** - Voting, proposals, delegation

## Best Practices

- Always check `isConnected` before calling contract methods
- Use view methods for read-only operations (no gas cost)
- Monitor transaction status for change methods
- Handle loading and error states appropriately
- Use proper gas limits for complex operations
- Validate user inputs before calling methods