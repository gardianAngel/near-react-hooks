import React from 'react';
import { NearProvider, useNearWallet } from 'near-react-hooks';
import './App.css';

function WalletConnection() {
  const { 
    signIn, 
    signOut, 
    accountId, 
    isConnected, 
    loading, 
    error 
  } = useNearWallet();

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Initializing NEAR connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔗 Simple Wallet Connection</h1>
        <p>Connect your NEAR wallet to get started</p>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-message">
            <h3>⚠️ Error</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}

        <div className="wallet-section">
          <div className="status-card">
            <div className="status-indicator">
              <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
              <span className="status-text">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {isConnected && (
              <div className="account-info">
                <h3>Account Details</h3>
                <div className="account-id">
                  <strong>Account ID:</strong>
                  <code>{accountId}</code>
                </div>
              </div>
            )}
          </div>

          <div className="action-buttons">
            {isConnected ? (
              <div className="connected-actions">
                <button 
                  onClick={signOut}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  {loading ? 'Disconnecting...' : 'Disconnect Wallet'}
                </button>
                <p className="help-text">
                  You're successfully connected to NEAR! You can now interact with dApps.
                </p>
              </div>
            ) : (
              <div className="disconnected-actions">
                <button 
                  onClick={() => signIn()}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Connecting...' : 'Connect NEAR Wallet'}
                </button>
                <p className="help-text">
                  Click above to connect your NEAR wallet and start using dApps
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h3>💡 What happens when you connect?</h3>
          <ul>
            <li>Your wallet will open in a new tab</li>
            <li>You'll be asked to authorize this application</li>
            <li>Once approved, you'll be redirected back here</li>
            <li>Your account ID will be displayed above</li>
          </ul>
        </div>
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
      <WalletConnection />
    </NearProvider>
  );
}