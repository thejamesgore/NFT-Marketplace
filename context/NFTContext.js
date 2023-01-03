import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'
import { create as ipfsHttpClient } from 'ipfs-http-client'

import { MarketAddress, MarketAddressABI } from './constants'

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID
const projectSecret = process.env.NEXT_PUBLIC_API_KEY_SECRET
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64'
)}`
const subdomain = 'https://tjgnftmp.infura-ipfs.io'

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider)

export const NFTContext = React.createContext()

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrenct] = useState('')
  const nftCurrency = 'ETH'

  useEffect(() => {
    checkIfWalletIsConnected()
    createSale('test', '0.025')
  }, [])

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask')

    const accounts = await window.ethereum.request({ method: 'eth_accounts' })

    if (accounts.length) {
      setCurrenct(accounts[0])
    } else {
      console.log('No accounts found')
    }
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
    try {
      const added = await client.add({ content: file })
      const url = `${subdomain}/ipfs/${added.path}`
      return url
    } catch (error) {
      console.log('error uploading to ipfs')
    }
  }

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput
    if (!name || !description || !price || fileUrl) return

    const data = JSON.stringify({ name, description, image: fileUrl })

    try {
      const added = await client.add(data)

      const url = `${subdomain}/ipfs/${added.path}`

      await createSale(url, price)

      router.push('/')
    } catch (error) {
      console.log('Error creating nft', error)
    }
  }

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3modal = new Web3Modal()
    const connection = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const price = ethers.utils.parseUnits(formInputPrice, 'ether')

    const contract = fetchContract(signer)

    // console.log(contract)
  }

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  )
}
