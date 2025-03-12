import {ethers} from "ethers";
import web3Modal from "web3modal";

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