import CreateProfileForm from "../components/CreateProfileForm/CreateProfileForm"
import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton/LoginButton";

export default function createProfilePage () {

    const { data: session } = useSession();
    const userName = session?.user?.name;

    console.log('session',session);
    if (!session) {
        return (
            <>
            <h1>Login to create a profile</h1>
            <LoginButton/>
            </>)
    }

    return (
        <>
        <h1> Create a profile with username {userName} (Github username):</h1>
        <CreateProfileForm/>
        <LoginButton/>
        </>
    )
};