import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'

import { MarketAddess, MarketAddressABI } from './constants'

export const NFTContext = React.createContext()
