import React from 'react'
import Languages from '../components/student/Languages';
import StudentNavBar from '../components/student/StudentNavBar';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux'
import { studentReducer } from '../Redux/studentSlice/studentSlice'

function Language() {

  const user = useSelector(studentReducer)
  const student = user._id


  return (
    <div>
      {student ? <StudentNavBar /> : <NavBar />}
      <Languages/>
    </div>
  )
}

export default Language
