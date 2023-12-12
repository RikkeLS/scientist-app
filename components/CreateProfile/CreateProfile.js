import CreateProfileForm from '../CreateProfileForm/CreateProfileForm'
import { useSession } from "next-auth/react";
import LoginButton from "../LoginButton/LoginButton";
import { useState } from "react";
import ShowCreatedProfileInfo from "../ShowCreatedProfileInfo/ShowCreatedProfileInfo";
import Papers from '../Papers/Papers';

export default function CreateProfile () {

    const { data: session } = useSession();
    const userName = session?.user?.name;
    const [newUserInfo, setNewUserInfo] = useState()

    if (!session) {
        return (
            <>
            <h2>Login to create a profile</h2>
            {/* <LoginButton/> */}
            </>)
    }
    
    function handleCreateNewUser(userInfo) {
        setNewUserInfo(userInfo)
        userInfo['userName']=session.user.name
        addNewUser()
        async function addNewUser() {
            const response = await fetch('api/create-profile-user', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(userInfo)
            })
            if (response.ok) {
            }
        }
    }


    return (
        <>
        <h2> Create a profile with username {userName} (Github username):</h2>
        
        {!newUserInfo ? (
            <CreateProfileForm onCreateNewUser={handleCreateNewUser} />)
        : <>
            <ShowCreatedProfileInfo newUserInfo={newUserInfo}/> 
            <Papers authorName={newUserInfo?.fullName}/>
          </>}
        </>
    )
};