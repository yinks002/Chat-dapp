import React,{useState, useEffect,useContext} from 'react';

import Style from "./alluser.module.css"
import { UserCard } from '../../components';
import { ChatAppContext } from '../../context/ChatAppContext';

const Alluser = () => {

    const {userList, addFriend} = useContext(ChatAppContext);
    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>Find your friends</h1>
            </div>

            <div className={Style.alluser}>
                {userList.map((el, i)=>(
                    <UserCard key={i + 1} 
                     el={el}                      
                     i={i}
                     addFriends = {addFriend}
                     />
                ))}
            </div>
        </div>
    );
}

export default Alluser;
