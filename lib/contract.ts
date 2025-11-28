export const contractAddress = "0x5381fFB9843842376f19cB2e14857dAe9E39E192";

// Export only the ABI array expected by viem/wagmi
export const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "vin",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "make",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "year",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "currentOwner",
        "type": "string"
      }
    ],
    "name": "RecordAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "vin",
        "type": "string"
      }
    ],
    "name": "RecordRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "vin",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "RecordServiced",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "vin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "make",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "year",
        "type": "uint16"
      },
      {
        "internalType": "string",
        "name": "currentOwnerName",
        "type": "string"
      }
    ],
    "name": "addRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "changeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRecordByIndex",
    "outputs": [
      {
        "internalType": "string",
        "name": "vin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "make",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "year",
        "type": "uint16"
      },
      {
        "internalType": "string",
        "name": "currentOwnerName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "serviced",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "vin",
        "type": "string"
      }
    ],
    "name": "getRecordByVIN",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "make",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "year",
        "type": "uint16"
      },
      {
        "internalType": "string",
        "name": "currentOwnerName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "serviced",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRecordsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "markServiced",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "removeRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;