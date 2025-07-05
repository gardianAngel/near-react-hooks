import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNearWallet } from '../src/hooks/useNearWallet';
import { NearProvider } from '../src/providers/NearProvider';

// Mock near-api-js
jest.mock('near-api-js', () => ({
  connect: jest.fn(),
  WalletConnection: jest.fn(),
  keyStores: {
    BrowserLocalStorageKeyStore: jest.fn(),
  },
}));

const TestComponent = () => {
  const { wallet, signIn, signOut, accountId, isConnected, loading, error } = useNearWallet();

  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="connected">{isConnected ? 'Connected' : 'Disconnected'}</div>
      <div data-testid="account-id">{accountId || 'No Account'}</div>
      <div data-testid="error">{error || 'No Error'}</div>
      <button onClick={() => signIn()} data-testid="sign-in">
        Sign In
      </button>
      <button onClick={() => signOut()} data-testid="sign-out">
        Sign Out
      </button>
    </div>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <NearProvider>
      {component}
    </NearProvider>
  );
};

describe('useNearWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with loading state', () => {
    renderWithProvider(<TestComponent />);
    
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
    expect(screen.getByTestId('connected')).toHaveTextContent('Disconnected');
    expect(screen.getByTestId('account-id')).toHaveTextContent('No Account');
  });

  test('should handle wallet connection', async () => {
    const mockWallet = {
      isSignedIn: jest.fn().mockReturnValue(true),
      getAccountId: jest.fn().mockReturnValue('test-account.testnet'),
      requestSignIn: jest.fn().mockResolvedValue(undefined),
      signOut: jest.fn(),
    };

    const { WalletConnection } = require('near-api-js');
    WalletConnection.mockImplementation(() => mockWallet);

    renderWithProvider(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    expect(screen.getByTestId('connected')).toHaveTextContent('Connected');
    expect(screen.getByTestId('account-id')).toHaveTextContent('test-account.testnet');
  });

  test('should handle sign in', async () => {
    const mockWallet = {
      isSignedIn: jest.fn().mockReturnValue(false),
      getAccountId: jest.fn().mockReturnValue(null),
      requestSignIn: jest.fn().mockResolvedValue(undefined),
      signOut: jest.fn(),
    };

    const { WalletConnection } = require('near-api-js');
    WalletConnection.mockImplementation(() => mockWallet);

    renderWithProvider(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    fireEvent.click(screen.getByTestId('sign-in'));

    await waitFor(() => {
      expect(mockWallet.requestSignIn).toHaveBeenCalledWith({
        contractId: undefined,
        methodNames: undefined,
      });
    });
  });

  test('should handle sign out', async () => {
    const mockWallet = {
      isSignedIn: jest.fn().mockReturnValue(true),
      getAccountId: jest.fn().mockReturnValue('test-account.testnet'),
      requestSignIn: jest.fn(),
      signOut: jest.fn(),
    };

    const { WalletConnection } = require('near-api-js');
    WalletConnection.mockImplementation(() => mockWallet);

    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    });

    renderWithProvider(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('connected')).toHaveTextContent('Connected');
    });

    fireEvent.click(screen.getByTestId('sign-out'));

    await waitFor(() => {
      expect(mockWallet.signOut).toHaveBeenCalled();
    });
  });

  test('should handle errors during initialization', async () => {
    const { WalletConnection } = require('near-api-js');
    WalletConnection.mockImplementation(() => {
      throw new Error('Wallet initialization failed');
    });

    renderWithProvider(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Wallet initialization failed');
    });
  });
});