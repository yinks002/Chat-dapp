"use client"
import "./globals.css";
import ChatAppProvider from "../../context/ChatAppContext";
import { Navbar } from "../../components/index";


 const RootLayout= ({ children })=> {
  console.log("comppoent:", children);
 
  return(
    
    <html lang="en">
      <body>
     
      <ChatAppProvider>
        <Navbar/>
      {children}
    </ChatAppProvider>
    </body>
    </html>
   
  )
}
export default RootLayout;
