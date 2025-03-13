// 0x5fbdb2315678afecb367f032d93f642f64180aa3

import {ethers} from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "../context/constants";

export const checkIfwalletConnected = async()=>{
    try{
        if(!window.ethereum) return  alert("install metamask");
        console.log("install metamask")

    const accounts = await window.ethereum.request({
        method: 'eth_accounts',
    });
    const firstAccount = accounts[0];
    return firstAccount;
    }catch(error){
       console.log(error)
    }
}

export const connectWallet = async()=>{
    try {
        if(!window.ethereum) return  alert("install metamask");
        console.log("install metamask")

    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
    });
    const firstAccount = accounts[0];
    return firstAccount;
    } catch (error) {
        
    }
}

const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppABI, ChatAppAddress, signerOrProvider);

export const connectingWithContract = async()=>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    }catch(error){
        console.log(error)
    }
}

export const converTime = (time)=>{
    const newTime=new Date(time.toNumber());

    const realTime = newTime.getHours() + "/" +
     newTime.getMinutes() + "/" +
     newTime.getSeconds() + " Date:" + 
     newTime.getDate() + "/" +
     (newTime.getMonth() + 1) + "/" + newTime.getFullYear();

     return realTime;
}