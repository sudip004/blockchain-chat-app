import React,{useState,useEffect,useContext} from 'react'

// INTERNAL IMPORT
// import {ChatAppContect} from '../Context/ChatAppContext'
import {Filter,Friend} from '../Components/index'

const HomePage = () => {

// const {} = useContext(ChatAppContect)

  return (
    <div>
      <Filter/>
      <Friend/>
    </div>
  )
}

export default HomePage