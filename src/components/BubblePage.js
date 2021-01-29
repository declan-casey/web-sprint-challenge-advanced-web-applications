import React, { useEffect, useState } from "react";
import axios from "axios";
import {axiosWithAuth} from "../helpers/axiosWithAuth"

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const getColors = () => {
    axiosWithAuth()
      .get("/colors")
      .then( res => setColorList(res.data))
      .catch( err => console.log(err))
  }
  useEffect( () => {
    async function pause(){
    try {
      const {data} = await axiosWithAuth()
      .get("/colors");
      setColorList(data)
      console.log(data)
    } catch(err){
      console.log(err)
    }}
    pause()
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors = {getColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
