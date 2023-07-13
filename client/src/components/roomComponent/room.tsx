import React from 'react'
import { useParams } from 'react-router-dom'
import{ ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { Box } from '@mui/joy'

const Room : React.FC<any> = (props) =>{
    const {user} = props
    console.log(user,"user");
    
    const {roomId} = useParams<string>()
    const myMeeting = async (element : any)=>{
        const appID = 368792388;
        const serverSecret = "07e020b3e6a345cad83b516d0af8d118";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId ,user._id ,user.firstName)
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            showTurnOffRemoteCameraButton: true,
            showTurnOffRemoteMicrophoneButton: true,
            showRemoveUserButton: true,
        })
    }
  return (
    <div>
      <Box ref={myMeeting}/>
    </div>
  )
}

export default Room
