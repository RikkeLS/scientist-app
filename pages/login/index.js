import { useEffect, useState } from "react";
import LoginButton from "../../components/LoginButton/LoginButton"
import { useSession } from "next-auth/react";

export default function loginPage () {
    const { data: session } = useSession();
    const userName = session?.user?.name;

    return (
    <>
    <h1>Login to create a profile</h1>
    <LoginButton/> 
    </>
    )
}