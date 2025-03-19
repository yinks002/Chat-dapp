"use client"

import React, {useEffect, useState, useContext} from "react";

import { Friend, Filter } from "../../components";




const MyApp = ()=>{
  
  return(
    <div>
      <Filter />
      <Friend />
    </div>

  )
}

export default MyApp;