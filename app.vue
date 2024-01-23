<script setup>

import { onMounted, ref } from 'vue';

import { createConfig, http } from '@wagmi/core'
import { bsc } from '@wagmi/core/chains'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { createClient } from 'viem'
import { connect, disconnect, reconnect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { metaMask } from '@wagmi/connectors'
import { walletConnect } from '@wagmi/connectors'
// import { config } from './config'
import { signMessage } from '@wagmi/core'
import { readContract } from '@wagmi/core'
import { watchAccount } from '@wagmi/core'
import { getAccount } from '@wagmi/core'
import { writeContract } from '@wagmi/core'
import {ethers} from 'ethers'

const accounts = ref(null)

// console.log(bsc)

let walletConnectConnector = walletConnect({
  chainId: 56,
      projectId: '89745a0e2917aea684838684fa6df645',
      isNewChainsStale: false, 
      metadata: { 
    name: 'Oxb', 
    description: 'oxb', 
    url: 'https://nuxt-pwa-test-inky.vercel.app/', 
  }, 
    })

const config = createConfig({
  chains: [bsc],
  connectors: [walletConnectConnector, injected()], 
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
// import HelloWorld from './components/HelloWorld.vue'

// let ethereum = null;


//   ethereum = new MetaMaskSDK({
//     dappMetadata: {
//       name: "Example Pure JS Dapp",
//       url: window.location.href,
//     }
//   });



const unwatch = watchAccount(config, {
  onChange(data) {
    console.log('Account changed!', data)
    getOxbBalance()
  },
})


const requestConnect = async () => {
  // ethereum.request({ method: 'eth_requestAccounts', params: [] });
  const result = await connect(config,{
    connector: walletConnectConnector
  })
  console.log(result)
  accounts.value = result

}

const { $pwa } = useNuxtApp()

const installApp = () => {
  $pwa.install()
}

const requestDisconnect = async () => {
  await disconnect(config)
  accounts.value = null
}

const signData = ref(null)

const requestSign = async () => {
  signData.value = null
  const result = await signMessage(config,{
    message:'test'
  }, walletConnectConnector)
  console.log(result)

  signData.value = result
  // accounts.value = result
}
const oxb_balance = ref(0)


const getOxbBalance = async () => {

  const account = getAccount(config)

  if(account?.address == null) {
    return
  }

  const abi = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'supply', type: 'uint256' }],
  },
]

console.log(account)

  let res1 = await readContract(config, {
    abi,
  address: '0x7536c00711E41df6aEBCCa650791107645b6bc52',
  functionName: 'balanceOf',
  args: [account.address],
  account: account.address
})



console.log(res1)

oxb_balance.value = res1
}


const stakeOxb = async () => {

  const account = getAccount(config)

  const oxbABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }], name: "Paused", type: "event" },
  { anonymous: false, inputs: [{ indexed: false, internalType: "uint256", name: "id", type: "uint256" }], name: "Snapshot", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }], name: "Unpaused", type: "event" },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "snapshotId", type: "uint256" },
    ],
    name: "balanceOfAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }], name: "burn", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "owner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "paused", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "snapshot", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "snapshotId", type: "uint256" }], name: "totalSupplyAt", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [{ internalType: "address", name: "newOwner", type: "address" }], name: "transferOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
];

  const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: false, internalType: "uint256", name: "reward", type: "uint256" },
    ],
    name: "Harvest",
    type: "event",
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }], name: "Initialized", type: "event" },
  { anonymous: false, inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }], name: "Paused", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "previousAdminRole", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "newAdminRole", type: "bytes32" },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: false, internalType: "uint256", name: "stakeAmount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "tier", type: "uint256" },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: false, internalType: "uint256", name: "taxAmount", type: "uint256" },
    ],
    name: "Tax",
    type: "event",
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }], name: "Unpaused", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: false, internalType: "uint256", name: "stakeAmount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "reward", type: "uint256" },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: false, internalType: "uint256", name: "withdrawalAmount", type: "uint256" },
    ],
    name: "Withdraw",
    type: "event",
  },
  { inputs: [], name: "ADMIN_ROLE", outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "DEFAULT_ADMIN_ROLE", outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "aprDivider", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "aprMultiplier", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "calculateRewardUpToBlock", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "_isExcluded", type: "bool" },
    ],
    name: "excludeFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }], name: "getRoleAdmin", outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "getStakedAmount", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }], name: "getTier", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "getTotalReward", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "getTotalWithdrawalAmount", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "harvest", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [{ internalType: "address", name: "_token", type: "address" }], name: "initialize", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "address", name: "", type: "address" }], name: "isExcludedFromFee", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "isQualified", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "paused", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "tokenAmount", type: "uint256" },
    ],
    name: "recoverToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }], name: "stake", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakeOf",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "startUnstakeTime", type: "uint256" },
      { internalType: "uint256", name: "latestBlock", type: "uint256" },
      { internalType: "uint256", name: "rewardCalculated", type: "uint256" },
      { internalType: "bool", name: "enrolled", type: "bool" },
      { internalType: "uint256", name: "tier", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }], name: "supportsInterface", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tierOf",
    outputs: [
      { internalType: "uint256", name: "minAmount", type: "uint256" },
      { internalType: "uint256", name: "timelockDuration", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "token", outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "unstake", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "unstakeFeePercentage", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_aprMultiplier", type: "uint256" },
      { internalType: "uint256", name: "_aprDivider", type: "uint256" },
    ],
    name: "updateAPR",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tierNumber", type: "uint256" },
      { internalType: "uint256", name: "_duration", type: "uint256" },
      { internalType: "uint256", name: "_min", type: "uint256" },
    ],
    name: "updateTier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [{ internalType: "contract IERC20Upgradeable", name: "_token", type: "address" }], name: "updateToken", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "uint256", name: "_unstakeFeePercentage", type: "uint256" }], name: "updateUnstakeFeePercentage", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
];

let targetWeiAmount = ethers.parseUnits(String(1), "ether");

const approveResult = await writeContract(config, {
  abi: oxbABI,
  address: '0x7536c00711E41df6aEBCCa650791107645b6bc52',
  functionName: 'approve',
  args: [
    '0x2281f53A583B00cb80814CcDfFE1544a5274daD2',
    targetWeiAmount
  ],
  account: account.address,
})

console.log(approveResult)


  const result = await writeContract(config, {
  abi,
  address: '0x2281f53A583B00cb80814CcDfFE1544a5274daD2',
  functionName: 'stake',
  args: [
    targetWeiAmount,
  ],
  account: account.address,
})

console.log(result)

}

// onMounted( async () => {
//   requestConnect()

//   // let sw = $pwa.swActivated
//   let sw = $pwa.getSWRegistration()

//   console.log(sw)
// })

const getSW = async () => {
  let sw = $pwa.getSWRegistration()
  let test2 = sw.pushManager.subscribe()
  console.log(test2)
  let test = await sw.pushManager.permissionState()
  // let subscription = await sw.pushManager.getSubscription()
  console.log(test)


}

const attemptReconnect = async () => {
  const result = await reconnect(config,{
    connectors:[ injected(), walletConnectConnector]
  })
  console.log(result)
  accounts.value = result
}



onMounted(() => {

  

  // attemptReconnect()


  // Notification.requestPermission().then(function(result) {
  //   console.log(result);
  // });

  
  // if ($pwa.offlineReady)
    // alert('App ready to work offline')
})
</script>

<template>
  <div class="p-8">
    <NuxtPwaManifest />
    <!-- <Script defer src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"></Script>
    <Script>
      window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.init({
      appId: "128191f3-21e0-40b9-9567-4d7c0cc0e387",
      safari_web_id: "web.onesignal.auto.27be598e-7a22-4ed6-a01a-10378439b214",
      notifyButton: {
        enable: true,
      },
    });
  });
    </Script> -->
    <div>
    <div class="space-x-4">
      <button class="btn" @click="requestConnect()">connect</button>
    <button class="btn" @click="requestDisconnect()">disconnect</button>
    <button class="btn" @click="requestSign()">Sign</button>
    <button class="btn" @click="stakeOxb()">Stake</button>

    <button @click="$pwa.updateServiceWorker()">
      Reload
    </button>

    <button @click="getSW()">getSW</button>

    </div>

    <p>Sign Data: {{ signData }}</p>



    <div class="p-2">
      <p>{{ accounts }}</p>
    <p>OXB BALANCE: {{ ethers.formatEther( oxb_balance) }}</p>
    </div>

    <button class="btn" @click="installApp()">Install App (Chrome / Android)</button>

    <div class="w-full sm:hidden flex justify-center items-center bottom-0 left-0 fixed">
      <img src="/phone.png" alt="">
    </div>

    
  </div>
  </div>
</template>
