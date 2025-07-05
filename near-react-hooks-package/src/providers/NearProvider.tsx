import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect, keyStores } from 'near-api-js';
import { NearConfig } from '../types';

interface NearContextType {
  config: NearConfig;
  near: any;
  initialized: boolean;
}

const NearContext = createContext<NearContextType | undefined>(undefined);

const defaultConfig: NearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
};

export function NearProvider({ 
  children, 
  config = defaultConfig 
}: { 
  children: React.ReactNode;
  config?: NearConfig;
}) {
  const [near, setNear] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initNear = async () => {
      try {
        const nearConnection = await connect({
          deps: {
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          },
          ...config,
        });
        
        setNear(nearConnection);
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize NEAR:', error);
        setInitialized(true);
      }
    };

    initNear();
  }, [config]);

  return (
    <NearContext.Provider value={{ config, near, initialized }}>
      {children}
    </NearContext.Provider>
  );
}

export function useNearProvider() {
  const context = useContext(NearContext);
  if (!context) {
    throw new Error('useNearProvider must be used within a NearProvider');
  }
  return context;
}