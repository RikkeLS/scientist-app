import LoginButton from "../../components/LoginButton/LoginButton";
import Link from "next/link";
import UserNavBar from "../../components/UserNavBar/UserNavBar";

import MainProfile from "../../components/MainProfile/MainProfile";

export default function MainProfilePage() {
 return (
        <> 
            <UserNavBar/>

            <MainProfile/>


            <LoginButton/>
            <Link href={'/'}>Go to homepage</Link>
        </>
    )
    

}