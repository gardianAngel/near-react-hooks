import React, { useState } from 'react';
import { NearProvider, useNearWallet, useNearAccount } from 'near-react-hooks';
import './App.css';

function TokenBalanceChecker() {
  const { signIn, signOut, accountId, isConnected, loading: walletLoading } = useNearWallet();
  const { balance, loading: accountLoading, error } = useNearAccount();
  const [recipientId, setRecipientId] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendTokens = async () => {
    if (!recipientId || !sendAmount || !accountId) return;
    
    setSending(true);
    setSendError(null);
    setSendSuccess(false);
    
    try {
      // Simulate token transfer (in real implementation, this would use wallet.account().sendMoney())
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful transfer
      setSendSuccess(true);
      setRecipientId('');
      setSendAmount('');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSendSuccess(false), 3000);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Failed to send tokens');
    } finally {
      setSending(false);
    }
  };

  const formatBalance = (bal: string | null) => {
    if (!bal) return '0';
    const num = parseFloat(bal);
    return num.toFixed(4);
  };

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
          <h1>💰 Token Balance Checker</h1>
          <p>Check your NEAR balance and send tokens</p>
        </header>
        
        <main className="main-content">
          <div className="connect-prompt">
            <div className="icon">🔐</div>
            <h2>Connect Your Wallet</h2>
            <p>Connect your NEAR wallet to view your balance and send tokens</p>
            <button 
              onClick={() => signIn()}
              className="btn btn-primary"
              disabled={walletLoading}
            >
              {walletLoading ? 'Connecting...' : 'Connect NEAR Wallet'}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Token Balance Checker</h1>
        <div className="account-info">
          <span>Connected as: <code>{accountId}</code></span>
          <button onClick={signOut} className="btn btn-small">Disconnect</button>
        </div>
      </header>

      <main className="main-content">
        <div className="balance-section">
          <div className="balance-card">
            <h2>Your Balance</h2>
            {accountLoading ? (
              <div className="loading-balance">
                <div className="spinner-small"></div>
                <span>Loading balance...</span>
              </div>
            ) : error ? (
              <div className="error-balance">
                <span className="error-icon">⚠️</span>
                <span>Error: {error}</span>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-small"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="balance-display">
                <div className="balance-amount">
                  <span className="amount">{formatBalance(balance)}</span>
                  <span className="currency">NEAR</span>
                </div>
                <div className="balance-actions">
                  <button 
                    onClick={() => window.location.reload()} 
                    className="btn btn-secondary btn-small"
                  >
                    🔄 Refresh Balance
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="send-section">
          <div className="send-card">
            <h2>Send NEAR Tokens</h2>
            
            {sendSuccess && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <span>Tokens sent successfully!</span>
              </div>
            )}

            {sendError && (
              <div className="error-message">
                <span className="error-icon">❌</span>
                <span>{sendError}</span>
                <button onClick={() => setSendError(null)} className="close-btn">×</button>
              </div>
            )}

            <div className="send-form">
              <div className="form-group">
                <label htmlFor="recipient">Recipient Account ID</label>
                <input
                  id="recipient"
                  type="text"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  placeholder="example.testnet"
                  className="form-input"
                  disabled={sending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (NEAR)</label>
                <input
                  id="amount"
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.1"
                  step="0.01"
                  min="0"
                  className="form-input"
                  disabled={sending}
                />
                <small className="form-help">
                  Available: {formatBalance(balance)} NEAR
                </small>
              </div>

              <button
                onClick={handleSendTokens}
                disabled={
                  sending || 
                  !recipientId.trim() || 
                  !sendAmount.trim() || 
                  parseFloat(sendAmount) <= 0 ||
                  parseFloat(sendAmount) > parseFloat(balance || '0')
                }
                className="btn btn-primary btn-full"
              >
                {sending ? (
                  <>
                    <div className="spinner-small"></div>
                    Sending...
                  </>
                ) : (
                  '💸 Send Tokens'
                )}
              </button>
            </div>

            <div className="send-info">
              <h3>ℹ️ Transaction Info</h3>
              <ul>
                <li>Gas fee: ~0.001 NEAR</li>
                <li>Transaction usually takes 1-2 seconds</li>
                <li>Make sure the recipient account exists</li>
                <li>Minimum transfer: 0.01 NEAR</li>
              </ul>
            </div>
          </div>
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
      <TokenBalanceChecker />
    </NearProvider>
  );
}