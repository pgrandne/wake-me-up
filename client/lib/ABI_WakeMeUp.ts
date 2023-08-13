export const ABI_WakeMeUp = 
[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "balanceOfAccount",
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
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "checkWithdraw",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContractBalance",
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
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getWakeupSchedule",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "wakeupWeekHour",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "wakeupWeekMinute",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "wakeupWeekendHour",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "wakeupWeekendMinute",
              "type": "uint8"
            }
          ],
          "internalType": "struct WakeMeUp.WakeupSchedule",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_wakeupWeekHour",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_wakeupWeekMinute",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_wakeupWeekendHour",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_wakeupWeekendMinute",
          "type": "uint8"
        }
      ],
      "name": "scheduleWakeup",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]