import React, {useState, useContext} from 'react';
import Image  from 'next/image';

//internal import 
import Style from "./Model.module.css"
import images from "../../assets";
import { ChatAppContext } from '../../context/ChatAppContext';
import { Loader } from '../index';

const Model = ({address,openBox, title, head, info,smallInfo, image}) => {
    //usestate
    const [name, setName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");

    const {loading} = useContext(ChatAppContext);
    
    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div  className={Style.Model_box_left}>
                <Image src={image} alt='my friend'  width={700} height={700}/>


                </div>

                <div className={Style.Model_box_right}>
        <h1>{title} <span>{head}</span>
        </h1>
        <p>{info}</p>
        <small>{smallInfo}</small>


        <div className={Style.Model_box_right_name}>
            <div className={Style.Model_box_right_name_info}>
                <Image src={images.username} alt='user' width={30} height={30}/>
                <input type="text" 
                placeholder='your name' 
                onChange={(e)=> setName(e.target.value)} />

            </div>
            <div className={Style.Model_box_right_name_info}>
                <Image src={images.account} alt='user' width={30} height={30}/>
                <input type="text" 
                placeholder={address || "Enter your account address"} 
                onChange={(e)=> setAccountAddress(e.target.value)} />

            </div>

        <div className={Style.Model_box_right_name_btn}>
            <button onClick={()=> functionName({name, accountAddress})}>
                {""}
                <Image src={images.send} alt='send' width={30} height={30}/>
                {""}
                 Submit 
            </button>

            <button onClick={()=> openBox(false)}>
                {""}
                <Image src={images.close} alt='send' width={30} height={30}/>
                {""}
                 cancel 
            </button>


        </div>


        </div>
                </div>
            </div>
        </div>
    );
}

export default Model;
