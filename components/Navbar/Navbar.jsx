"use client"
import React,{useEffect, useState, useContext} from 'react';
import Image from "next/image"
import Link from 'next/link';
import images from "../../assets";
//internal import
import Style from "./Navbar.module.css";


import { ChatAppContext } from '../../context/ChatAppContext';
import { Model, Error } from '../index';


const Navbar = () => {
    const menuItems = [
        {
            menu: "All users",
            link: "alluser"
        },
        {
            menu: "CHAT",
            link: "/"
        },
        {
            menu: "SETTING",
            link: "/"
        },
        {
            menu: "FAQS",
            link: "/"
        },
        {
            menu: "TERMS AND CONDITIOSN",
            link: "/"
        }
    ]
    //usesate
    const [active, setActive] = useState(2);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const {account, userName, connectWallet, createAccount, error} = useContext(ChatAppContext)
    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    <Image src={images.logo} alt='logo' width={50} height={50}/>

                </div>
                <div className={Style.NavBar_box_right}>
                  {/* desktop */}
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el, i)=>(
                        <div onClick={()=> setActive(i+1)} key={i + 1} className={`${Style.NavBar_box_right_menu_item} ${active == i + 1 ? Style.active_btn : ""}
                            `}>
                               <Link className={Style.NavBar_box_right_menu_items_link}
                               href={el.link}
                               >
                                {el.menu}
                                </Link> 
                            </div>
                        ))}
                    </div>
                    {/* mobile */}
                    {open && (
                         <div className={Style.mobile_menu}>
                         {menuItems.map((el, i)=>(
                         <div onClick={()=> setActive(i+1)} key={i + 1} className={`${Style.mobile_menu_item} ${active == i + 1 ? Style.active_btn : ""}
                             `}>
                                <Link className={Style.mobile_menu_items_link}
                                href={el.link}
                                >
                                 {el.menu}
                                 </Link> 
                             </div>
                         ))}
                    <p className={Style.mobile_menu_btn}>
                        <Image src = {images.close}
                        alt='close'
                        width={50}
                        height={50}
                        onClick={()=> setOpen(false)}
                        />
                    </p>

                     </div>
                    )}

                    {/* connect wallet */}
                    <div className={Style.NavBar_box_right_connect}>
                        {account == "" ? (
                            <button onClick={()=> connectWallet()}>
                                {""}
                                <span>connect walllet</span>
                            </button>
                        ): (
                            <button onClick={()=> setOpenModel(true)}>
                                {""}
                                <Image src={userName ? images.accountName : images.create2}
                                alt= "Account imaege"
                                width={20}
                                height={20}
                                />
                                {""}
                                <small>{userName || "create Account"}</small>
                            </button>
                        )}
                    </div>
                </div>

            </div>
            {/* model component */}
            {openModel && (
                <div className={Style.modelBox}>
                    <Model openBox= {setOpenModel}
                    title="welcome to"   
                    head = "Chat app buddy"
                    info = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet porro ipsum eaque tempore, accusamus optio sint exercitationem qui nisi cumque aspernatur delectus autem saepe et molestias aliquam vero quisquam itaque."
                    smallInfo = "kindly select your name"
                    image = {images.hero}
                    functionName = {createAccount}
                    address= {account}
                    />
                    
                </div>
            )}

            {error == "" ? "" : <Error error = {error} />}
        </div>
    );
}

export default Navbar;


