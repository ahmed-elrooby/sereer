import React from 'react'
import Cards from './components/utils/Home/Cards.jsx'
import Intro from './components/utils/Home/Intro.jsx'
import Table from './components/utils/Home/Table.jsx'
import StatusPlatform from './components/utils/Home/StatusPlatform.jsx'

const page = () => {
  return<>
  <Intro/>
  <Cards/>
  <div className="grid grid-cols-1 gap-5 mt-8 md:mt-14 md:grid-cols-3">
    <Table/>
    <StatusPlatform/>
    </div>
  </>
}

export default page
