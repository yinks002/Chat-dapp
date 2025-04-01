"use client"

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



//internal import 
import images from "../../../assets"
import Style from "./Chat.module.css";
import { converTime } from '../../../utils/apiFeature';
import { Loader } from '../..';


const Chat = ({functionName,readMessage,
    friendMsg,
    account,userName,loading,
    readUser,
    currentUserAddress
    ,currentUserName}) => {


    //state variables
    const [message, setMessage]  = useState('');
    const [chatData,setChatData] = useState(
        {
            name: "",
            address: ""
        }
    )    
    const router = useRouter()

    useEffect(() => {
        if (!router) return; // ✅ Check if router exists
        console.log("Router Object:", router);

        // You can access the current path like this
        console.log("Current Path:", router.pathname);

        // Extract query params manually (since `router.query` is not available)
        const urlParams = new URLSearchParams(window.location.search);
        const address = urlParams.get("address");
        const name = urlParams.get("name");

        if (!address) return; // ✅ Instead of `router.isReady`

        setChatData({ name, address });
        readMessage(address);
        readUser(address);

        console.log("Chat Address:", address);
    }, [router]);
   useEffect(() => {
    if (!chatData.address) return;

    const searchParams = new URLSearchParams(window.location.search);
    console.log("THESEACH", searchParams)
    const address = searchParams.get("address");

    if (address) {
        readMessage(address);
        readUser(address);
    }
}, [chatData.address]);

  
    return (
     
        <div className={Style.Chat}>
            {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
            <Image src={images.accountName}
            alt='image'
            width={70}
            height={70}            
            />
              
            <div className={Style.Chat_user_info_box}>
                <h4>{currentUserName}</h4>
                <p className={Style.show}> {currentUserAddress} </p>
            </div>
        </div>            
    

            ): (
                ""
            )}

            <div className={Style.Chat_box_box}> 
                <div className={Style.Chat_box}>
                    <div className={Style.Chat_box_left}>
                        {
                            friendMsg.map((el, i)=>(
                                <div>
                                    {el.sender == chatData.address? (
                                        <div className={Style.Chat_box_left_title}>
                                            <Image 
                                            src={images.accountName}
                                            alt='image'
                                            width={50}
                                            height={50}
                                            />
                                            <span>
                                                {chatData.name} {""}
                                                <small>Time: {converTime(el.timestamp)}</small>
                                            </span>
                                        </div>
                                    ): (

                                        <div className={Style.Chat_box_left_title}>
                                        <Image 
                                        src={images.accountName}
                                        alt='image'
                                        width={50}
                                        height={50}
                                        />
                                        <span>
                                            {userName} {""}
                                            <small>Time: {converTime(el.timestamp)}</small>
                                        </span>
                                    </div>

                                    )}
                                    <p key={1 + i}>{el.msg}
                                    {""}
                                    {""}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                        {currentUserName && currentUserAddress ? (
                              <div className={Style.Chat_box_send}>
                                <div className={Style.Chat_box_send_img}>
                                    <Image 
                                    src={images.smile}
                                    alt='smile'
                                    width={50}
                                    height={50}
                                    />
                                    <input type="text" placeholder='type your message here'
                                    onChange={(e)=> setMessage(e.target.value)}
                                    />
                                    <Image src={images.file}
                                    alt='file'
                                    width={50}
                                    height={50}
                                    />
                                    {loading == true ? (
                                        <Loader />
                                    ): (
                                        <Image src={images.send}
                                        alt='file'
                                        width={50}
                                        height={50}
                                        onClick={()=> 
                                            functionName({msg: message,
                                                 address: chatData.address})}
                                        />
                                    )}


                                </div>

                              </div>
                        ): (
                           "" 
                        )}

            </div>
            
        </div>
    );
}

export default Chat;
