import CreateProfile from "../components/CreateProfile/CreateProfile"
import LoginButton from "../components/LoginButton/LoginButton"
import Link from "next/link"

export default function CreateProfilePage () {
    return (
        <>
        <CreateProfile/>
        <LoginButton/>
        <Link href={'/'}>go to homepage</Link>
        </>
    )
};