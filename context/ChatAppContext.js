'use client'
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

import { checkIfwalletConnected , 
    connectWallet,
     connectingWithContract,
      converTime} from '../utils/apiFeature';

export const ChatAppContext = React.createContext();

const ChatAppProvider = ({children}) =>{
      //usestate
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    //chat user infrmation
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");


    const router = useRouter();

    //fetch data time of page load
    const fetchData = async()=>{
        try{
            //call contract
            const contract =  await connectingWithContract();
            console.log(contract)
            //get account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //get user name
            const userName = contract.getUsername(connectAccount);
            console.log(userName)
            setUserName(userName);
            //get friend list
            const friendLists = await contract.getMyFriendList();
            console.log(friendLists)
            setFriendLists(friendLists);

            //get all app usr list
            const userList = await contract.getAllAppUser();
            console.log(userList)
            setUserLists(userList);
        }catch(error){
            setError("please insralll and connect your wallet")
        }
    }

        //read message
        const readMessage = async(friendAddress)=>{
            try{
                const contract= await connectingWithContract();
                const read = await contract.readMessage(friendAddress);
                setFriendMsg(read);
            }catch(error){
                setError("you currently do not have any read messages, please check back later")

            }
        }
    //create account
    const createAccount = async({name, accountAddress})=>{
        try{
            if( name || accountAddress)
                return setError("Name and account address cannot be empty");
                const contract = await connectingWithContract();
                const getCreatedUser = await contract.createAccount(name);
                setLoading(true);
                await getCreatedUser.wait();
                setLoading(false);
                window.location.reload();
            
        }catch(error){
            setError("error encountere while creating your account")
        }
    }
    //add friend
    const addFriends  = async({name, accountAddress})=>{
        try {
            if(name || accountAddress) return setError("please provide name and address");
            const contract= await connectingWithContract();
            const addMyfriend= await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyfriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("something went wrong while adding friends")
        }
    }
//send message to your friends
    const sendMessage = async({msg,address})=>{
        try {
            if(msg || address) return setError("please type your message");
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("reload and try again")
        }
    }
    //read user info
    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress)
        setCurrentUserAddress(userAddress)
        setCurrentUserName(userName)
    }
    useEffect(()=>{
        // fetchData();
    },[])

    return(
      
       
        <ChatAppContext.Provider value={{readMessage,
        createAccount,
         addFriends,
          sendMessage,
           readUser,
           account,
           userName,
           friendLists,
           friendMsg,
           loading,
           userLists,
           error
           }}>
            {children}
        </ChatAppContext.Provider>
    )
}

export default ChatAppProvider;


