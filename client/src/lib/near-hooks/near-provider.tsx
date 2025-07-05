import { createContext, useContext, useEffect, useState } from "react";
import { NearConfig } from "./types";

interface NearContextType {
  config: NearConfig;
  near: any;
  initialized: boolean;
}

const NearContext = createContext<NearContextType | undefined>(undefined);

const defaultConfig: NearConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
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
    // Initialize NEAR connection
    const initNear = async () => {
      try {
        // Mock NEAR connection for demo purposes
        // In production, this would use actual near-api-js
        const mockNear = {
          config,
          connection: {
            networkId: config.networkId,
          },
        };
        
        setNear(mockNear);
        setInitialized(true);
      } catch (error) {
        console.error("Failed to initialize NEAR:", error);
        setInitialized(true);
      }
    };

    initNear();
  }, [config]);

  const contextValue = {
    config,
    near,
    initialized,
  };

  return (
    <NearContext.Provider value={contextValue}>
      {children}
    </NearContext.Provider>
  );
}

export function useNear() {
  const context = useContext(NearContext);
  if (!context) {
    throw new Error("useNear must be used within a NearProvider");
  }
  return context;
}
