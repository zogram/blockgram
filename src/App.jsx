import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import Feeds from './pages/Feeds' 
import CreatePost from './pages/CreatePost'
import {
  Route,
  Routes
} from "react-router-dom";
import { FC, useMemo } from 'react';
import { PhantomWalletAdapter,  } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider, useConnection, } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useWallet } from "@solana/wallet-adapter-react";
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  const { connection } = useConnection();
  const { connected } = useWallet();

  

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // const wallets = useMemo(
  //     () => [
  //         /**
  //          * Wallets that implement either of these standards will be available automatically.
  //          *
  //          *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
  //          *     (https://github.com/solana-mobile/mobile-wallet-adapter)
  //          *   - Solana Wallet Standard
  //          *     (https://github.com/anza-xyz/wallet-standard)
  //          *
  //          * If you wish to support a wallet that supports neither of those standards,
  //          * instantiate its legacy wallet adapter here. Common legacy adapters can be found
  //          * in the npm package `@solana/wallet-adapter-wallets`.
  //          */
  //         new UnsafeBurnerWalletAdapter(),
  //     ],
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     [network]
  // );

  const wallets = [new PhantomWalletAdapter(), ];

  return (

    
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="feeds" element={<Feeds />} />
            <Route path="createPost" element={<CreatePost />} />
          </Routes>  
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
