import CreateProfileForm from "../components/CreateProfileForm/CreateProfileForm"
import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton/LoginButton";
import { useState } from "react";
import ShowCreatedProfileInfo from "../components/ShowCreatedProfileInfo/ShowCreatedProfileInfo";

export default function createProfilePage () {

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
        console.log('new user info:',userInfo);
        setNewUserInfo(userInfo)
    }


    return (
        <>
        <h1> Create a profile with username {userName} (Github username):</h1>
        <CreateProfileForm onCreateNewUser={handleCreateNewUser} />
        {newUserInfo ? <ShowCreatedProfileInfo newUserInfo={newUserInfo} /> :'' }

        <LoginButton/>
        </>
    )
};