import React from 'react'
import StudentNavBar from '../components/student/StudentNavBar'
import SearchResults from '../components/student/SearchResults'

function StudentSearchPage() {
  return (
    <div>
      <StudentNavBar/>
      <SearchResults post={{description:'dsdsdcdsc', image: 'cddscds', imageText: "cscscss",
    linkText:"cdcscdcs",
    title:"dscscscsdc"}}/>
    </div>
  )
}

export default StudentSearchPage
