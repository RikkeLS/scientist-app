import CreateProfile from "../components/CreateProfile/CreateProfile"
import LoginButton from "../components/LoginButton/LoginButton"
import Link from "next/link"

export default function CreateProfilePage () {
    return (
        <>
        <section className="createProfileContainer">
        <CreateProfile/>
        {/* <LoginButton/> */}
        </section>
        <Link href={'/'}>Go to homepage</Link>
        </>
    )
};