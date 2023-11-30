import { useEffect, useState } from "react";
import LoginButton from "../../components/LoginButton/LoginButton"
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function loginPage () {
    const { data: session } = useSession();
    console.log('session',session);
    const userName = session?.user?.name;

    return (
    <>
    <h1>Login to create a profile</h1>
    <LoginButton/> 
    <Link href={`${userName}/create-profile`}>Create profile page</Link>
    </>
    )
}