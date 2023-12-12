import LoginButton from "../../components/LoginButton/LoginButton";
import Link from "next/link";
import UserNavBar from "../../components/UserNavBar/UserNavBar";

import MainProfile from "../../components/MainProfile/MainProfile";
import Footer from "../../components/Footer/Footer";

export default function MainProfilePage() {
 return (
        <> 
            <UserNavBar/>

            <MainProfile/>
            <Footer/>

        </>
    )
    

}