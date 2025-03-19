import React, {useState, useContext} from 'react';
import Image from 'next/image';
//internal import
import Style from "./Filter.module.css";
import images from "../../assets"
import { ChatAppContext } from '../../context/ChatAppContext';
import { Model } from '..';
const Filter = () => {
    const {account, addFriends}  = useContext(ChatAppContext)
    //usetate
    const [addFriend, setAddFriend] = useState(false);
    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                <div className={Style.Filter_box_left_search}>

                 <Image src={ images.search}
                 alt= "image"
                 width= {20}
                 height= {20}
                 />   
                 <input type="text" placeholder='search...s' />

            </div>

                </div>
                <div className={Style.Filter_box_right}>

                    <button>
                        <Image src={images.clear}
                        alt='clear'
                        width={20}
                        height={20}/>
                        Clear Chat
                    </button>
                    <button  onClick={()=> setAddFriend(true)}>
                        <Image src={images.clear}
                        alt='clear'
                        width={20}
                        height={20}/>
                        ADD FRIEND
                    </button>
                </div>
            </div>

            {/* model component */}
            {addFriend && (
                <div className={Style.Filter_model}>
                    <Model  openBox={setAddFriend}
                    title= "WELCOME TO"
                    head="CHATBUDDY"
                    info="Lorem ipsum dolor sit amet
                     consectetur adipisicing elit.
                      Cumque dolores atque ea. Ea quaerat aut tempore 
                      fuga totam? Repellendus dolores eligendi similique 
                      expedita saepe ad 
                    voluptatum at voluptas libero aut."

                    smallInfo="kindly select your friend name and address.."
                    image= {images.hero}
                    functionName={addFriends}
                    />
                </div>
              
            )}
            
        </div>
    );
}

export default Filter;
