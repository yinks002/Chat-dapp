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
        

    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
    });
    const firstAccount = accounts[0];
    console.log("first account", firstAccount)
    return firstAccount;

    } catch (error) {
        console.log(error)
    }
}

const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async()=>{
    try{
        console.log("abi",ChatAppABI, ChatAppAddress)
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        console.log("signer", signer);
        const contract = fetchContract(signer);
        return contract;
    }catch(error){
        console.log(error)
    }
}


export const converTime = (time) => {
    // Ensure `time` is converted properly
    const timestamp = typeof time === "bigint" ? Number(time) : Number(time);
    
    if (isNaN(timestamp)) return "Invalid date"; // Handle errors

    const newTime = new Date(timestamp * 1000); // Convert to milliseconds if it's a Unix timestamp

    return `${newTime.getHours()}:${newTime.getMinutes()}:${newTime.getSeconds()} Date: ${newTime.getDate()}/${newTime.getMonth() + 1}/${newTime.getFullYear()}`;
};


// export const converTime = (time)=>{
//     const newTime=new Date(time.toNumber());

//     const realTime = newTime.getHours() + "/" +
//      newTime.getMinutes() + "/" +
//      newTime.getSeconds() + " Date:" + 
//      newTime.getDate() + "/" +
//      (newTime.getMonth() + 1) + "/" + newTime.getFullYear();

//      return realTime;
// }