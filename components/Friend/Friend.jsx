"use client"
import React, {useState, useContext} from 'react';
import Image from 'next/image';
import images from "../../assets"
import Card from './Card/Card';
import Chat from './Chat/Chat';

import Style from "./Friend.module.css"
import { ChatAppContext } from '../../context/ChatAppContext';
const Friend = () => {



    const {sendMessage, account, friendLists, 
        readMessage , 
        userName, 
        loading, 
        currentUserName, 
        readUser,
        friendMsg,
        currentUserAddress}= useContext(ChatAppContext)
    return (
        <div className={Style.Friend}>
           <div className={Style.Friend_box}>
            <div className={Style.Friend_box_left}>
                {friendLists.map((el, i)=>(
                    <Card key={i+ 1} 
                 el= {el}
                 i = {i}
                 readMessage = {readMessage}
                 readUser= {readUser}

                    />
                ))
                
                }


            </div>

            <div className={Style.Friend_box_right}>
                <Chat 
                functionName = {sendMessage}
                readMessage = {readMessage}
                readUser={readUser}
                friendMsg = {friendMsg}
                account = {account}
                userName = {userName}
                loading = {loading}
                currentUserAddress = {currentUserAddress}
                currentUserName = {currentUserName}
                
                />

            </div>
            </div> 
            
        </div>
    );
}

export default Friend;
