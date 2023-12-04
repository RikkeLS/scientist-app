import LoginButton from "../../components/LoginButton/LoginButton";
import Link from "next/link";

import MainProfile from "../../components/MainProfile/MainProfile";

export default function MainProfilePage() {
 return (
        <> 
            <MainProfile/>

            <LoginButton/>
            <Link href={'/'}>Go to homepage</Link>
        </>
    )
    

}