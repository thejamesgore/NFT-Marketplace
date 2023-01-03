import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'
import { create as ipfsHttpClient } from 'ipfs-http-client'

import { MarketAddess, MarketAddressABI } from './constants'

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID
const projectSecret = process.env.NEXT_PUBLIC_API_KEY_SECRET
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64'
)}`

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

export const NFTContext = React.createContext()

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrenct] = useState('')
  const nftCurrency = 'ETH'

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask')

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })

    if (accounts.length) {
      setCurrenct(accounts[0])
    } else {
      console.log('No accounts found')
    }

    console.log({ accounts })
  }

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please isntall Metamask')

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    setCurrenct(accounts[0])

    window.location.reload()
  }

  const uploadToIPFS = async (file) => {
    const subdomain = 'https://tjgnftmp.infura-ipfs.io'
    try {
      const added = await client.add({ content: file })
      const url = `${subdomain}/ipfs/${added.path}`
      return url
    } catch (error) {
      console.log('error uploading to ipfs')
    }
  }

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  )
}
