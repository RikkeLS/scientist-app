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
            <h1>Login to create a profile</h1>
            <LoginButton/>
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
    if (newUserInfo) {
        const allNames = newUserInfo?.fullName.split(' ')
        const lastName = allNames[allNames?.length-1]
    }


    return (
        <>
        <h1> Create a profile with username {userName} (Github username):</h1>
        
        {!newUserInfo ? (
            <CreateProfileForm onCreateNewUser={handleCreateNewUser} />)
        : <>
            <ShowCreatedProfileInfo newUserInfo={newUserInfo}/> 
            <Papers authorName={newUserInfo?.fullName}/>
          </>}
        </>
    )
};