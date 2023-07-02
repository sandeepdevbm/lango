import React,{useState,useEffect} from 'react';
import ChatComponent from '../../components/chats/ChatComponent';
import MentorNavBar from '../../components/mentor/MentorNavBar';
import { useSelector } from 'react-redux';
import { mentorReducer } from '../../Redux/mentorSlice/mentorSlice';
import { studentReducer } from '../../Redux/studentSlice/studentSlice';
import StudentNavBar from '../../components/student/StudentNavBar';

interface UserProps{
  role:string;
}

const ChatPage: React.FC = () => {
  const [user,setUser]= useState<UserProps>()
  const mentorData = useSelector(mentorReducer)
  const studentData = useSelector(studentReducer)

  useEffect(()=>{
    const data = ()=>{
      if(mentorData.role ==="mentor") setUser(mentorData)
      else if(studentData.role === "student") setUser(studentData)
    }
    data()
  },[])

  console.log(user,"```````````");
  

  return (
    <div>
      {user?.role === "mentor" && (
      <> 
        <MentorNavBar/>
        <ChatComponent user = {user}/>
        </>
        )}
        
        {user?.role === "student" && (
        <>
        <StudentNavBar/>
        <ChatComponent user = {user}/>
        </>
        )}
    </div>
  );
};

export default ChatPage;
