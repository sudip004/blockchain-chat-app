import {ethers} from 'ethers'
import web3Modal from 'web3modal'

import {ContractAddress,ChatAppABI} from '../Context/constants'

export const CheckIfWalletConnected = async() => {
    try {
        if(!window.ethereum) return console.log("Install Meatmask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstaccount = accounts[0];
        return firstaccount

    } catch (error) {
        console.log(error);
    }
}

export const connectWallet = async() => {
    try {
        if(!window.ethereum) return console.log("Install Meatmask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        const firstaccount = await accounts[0];
        return firstaccount

    } catch (error) {
        console.log(error);
    }
}

const fetchContract = (signerOrPeovider) => 
new ethers.Contract(ContractAddress,ChatAppABI , signerOrPeovider)

export const connectWithContract = async () => {
    try {
        const web3modal= new web3Modal()
        const connection = await web3modal.connect();
        // provider is the interface to communicate with Ethereum network
        const provider = new ethers.BrowserProvider(connection)
        // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/")
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)
        return contract;

    } catch (error) {
        console.log(error);
    }
}

export const convertTime = (time) => {
    const newTime = new Date(time.toNumber())

    const realTime = newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    "Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear()

    return realTime;
}
