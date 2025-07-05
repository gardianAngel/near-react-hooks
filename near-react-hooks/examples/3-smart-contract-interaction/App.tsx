import React, { useState, useEffect } from 'react';
import { NearProvider, useNearWallet, useNearContract, useNearTransaction } from 'near-react-hooks';
import './App.css';

function SmartContractInteraction() {
  const { signIn, signOut, accountId, isConnected, loading: walletLoading } = useNearWallet();
  const { 
    callMethod, 
    viewMethod, 
    loading: contractLoading, 
    error: contractError 
  } = useNearContract('hello.near-examples.testnet', {
    viewMethods: ['get_greeting'],
    changeMethods: ['set_greeting']
  });

  const [greeting, setGreeting] = useState<string>('');
  const [newGreeting, setNewGreeting] = useState('');
  const [txHash, setTxHash] = useState<string>('');
  const [isSettingGreeting, setIsSettingGreeting] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);
  const [setError, setSetError] = useState<string | null>(null);

  const { status: txStatus, loading: txLoading, receipt } = useNearTransaction(txHash);

  const handleGetGreeting = async () => {
    if (!isConnected) return;
    
    try {
      setViewError(null);
      const result = await viewMethod('get_greeting');
      setGreeting(result || 'No greeting set');
    } catch (error) {
      setViewError(error instanceof Error ? error.message : 'Failed to get greeting');
      console.error('Error getting greeting:', error);
    }
  };

  const handleSetGreeting = async () => {
    if (!isConnected || !newGreeting.trim()) return;
    
    try {
      setIsSettingGreeting(true);
      setSetError(null);
      
      const result = await callMethod('set_greeting', { 
        message: newGreeting.trim() 
      });
      
      // In a real implementation, this would return the transaction hash
      const mockTxHash = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setTxHash(mockTxHash);
      setNewGreeting('');
      
      // Automatically refresh greeting after successful transaction
      setTimeout(() => {
        handleGetGreeting();
      }, 2000);
      
    } catch (error) {
      setSetError(error instanceof Error ? error.message : 'Failed to set greeting');
      console.error('Error setting greeting:', error);
    } finally {
      setIsSettingGreeting(false);
    }
  };

  // Load greeting on component mount and when wallet connects
  useEffect(() => {
    if (isConnected && !contractLoading) {
      handleGetGreeting();
    }
  }, [isConnected, contractLoading]);

  if (walletLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Initializing NEAR connection...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>📄 Smart Contract Interaction</h1>
          <p>Interact with a NEAR smart contract</p>
        </header>
        
        <main className="main-content">
          <div className="connect-prompt">
            <div className="icon">🔐</div>
            <h2>Connect Your Wallet</h2>
            <p>Connect your NEAR wallet to interact with the greeting contract</p>
            <button 
              onClick={() => signIn()}
              className="btn btn-primary"
              disabled={walletLoading}
            >
              {walletLoading ? 'Connecting...' : 'Connect NEAR Wallet'}
            </button>
          </div>
          
          <div className="contract-info">
            <h3>About this Contract</h3>
            <p>
              This demo uses the <code>hello.near-examples.testnet</code> contract,
              which stores and retrieves greeting messages on the NEAR blockchain.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📄 Smart Contract Interaction</h1>
        <div className="account-info">
          <span>Connected as: <code>{accountId}</code></span>
          <button onClick={signOut} className="btn btn-small">Disconnect</button>
        </div>
      </header>

      <main className="main-content">
        <div className="contract-section">
          <div className="contract-info-card">
            <h2>Contract Information</h2>
            <div className="contract-details">
              <div className="detail-item">
                <span className="label">Contract ID:</span>
                <code>hello.near-examples.testnet</code>
              </div>
              <div className="detail-item">
                <span className="label">Available Methods:</span>
                <div className="methods">
                  <span className="method view">get_greeting</span>
                  <span className="method change">set_greeting</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="interaction-section">
          <div className="view-section">
            <div className="section-card">
              <h3>👀 View Contract State</h3>
              <p>Read the current greeting from the contract (free operation)</p>
              
              {viewError && (
                <div className="error-message">
                  <span className="error-icon">❌</span>
                  <span>{viewError}</span>
                </div>
              )}

              <div className="greeting-display">
                <div className="greeting-box">
                  <div className="greeting-label">Current Greeting:</div>
                  <div className="greeting-text">
                    {contractLoading ? (
                      <div className="loading-inline">
                        <div className="spinner-small"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      greeting || 'No greeting loaded'
                    )}
                  </div>
                </div>
                
                <button
                  onClick={handleGetGreeting}
                  disabled={contractLoading}
                  className="btn btn-secondary"
                >
                  {contractLoading ? 'Loading...' : '🔄 Refresh Greeting'}
                </button>
              </div>
            </div>
          </div>

          <div className="change-section">
            <div className="section-card">
              <h3>✍️ Change Contract State</h3>
              <p>Set a new greeting message (requires gas fee)</p>

              {setError && (
                <div className="error-message">
                  <span className="error-icon">❌</span>
                  <span>{setError}</span>
                  <button onClick={() => setSetError(null)} className="close-btn">×</button>
                </div>
              )}

              <div className="set-greeting-form">
                <div className="form-group">
                  <label htmlFor="new-greeting">New Greeting Message</label>
                  <input
                    id="new-greeting"
                    type="text"
                    value={newGreeting}
                    onChange={(e) => setNewGreeting(e.target.value)}
                    placeholder="Enter your greeting message..."
                    className="form-input"
                    disabled={isSettingGreeting}
                    maxLength={100}
                  />
                  <small className="form-help">
                    {newGreeting.length}/100 characters
                  </small>
                </div>

                <button
                  onClick={handleSetGreeting}
                  disabled={isSettingGreeting || !newGreeting.trim()}
                  className="btn btn-primary btn-full"
                >
                  {isSettingGreeting ? (
                    <>
                      <div className="spinner-small"></div>
                      Setting Greeting...
                    </>
                  ) : (
                    '💾 Set New Greeting'
                  )}
                </button>
              </div>

              <div className="transaction-info">
                <h4>ℹ️ Transaction Details</h4>
                <ul>
                  <li>Gas fee: ~0.001 NEAR</li>
                  <li>Transaction confirmation: 1-2 seconds</li>
                  <li>Data stored permanently on blockchain</li>
                  <li>Anyone can read your greeting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {txHash && (
          <div className="transaction-section">
            <div className="section-card">
              <h3>📊 Transaction Status</h3>
              
              <div className="transaction-details">
                <div className="detail-item">
                  <span className="label">Transaction Hash:</span>
                  <code className="tx-hash">{txHash}</code>
                </div>
                
                <div className="detail-item">
                  <span className="label">Status:</span>
                  <div className="status-display">
                    {txLoading ? (
                      <span className="status pending">
                        <div className="spinner-tiny"></div>
                        Confirming...
                      </span>
                    ) : txStatus === 'success' ? (
                      <span className="status success">
                        ✅ Successful
                      </span>
                    ) : txStatus === 'failure' ? (
                      <span className="status failure">
                        ❌ Failed
                      </span>
                    ) : (
                      <span className="status pending">
                        ⏳ Pending
                      </span>
                    )}
                  </div>
                </div>

                {receipt && (
                  <div className="detail-item">
                    <span className="label">Block Explorer:</span>
                    <a 
                      href={`https://explorer.testnet.near.org/transactions/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="explorer-link"
                    >
                      View on NEAR Explorer →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by NEAR React Hooks 🚀</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <NearProvider>
      <SmartContractInteraction />
    </NearProvider>
  );
}