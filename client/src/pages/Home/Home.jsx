import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodList from '../../components/FoodList/FoodList'
import MobileApp from '../../components/MobileApp/MobileApp'

const Home = () => {
  const [getCategory,setCategory] = useState("All")
  return (
    <div >
        <Header/>
        <ExploreMenu category={getCategory} setCategory={setCategory} />
        <FoodList category={getCategory}/>
        <MobileApp/>
    </div>
  )
}

export default Home