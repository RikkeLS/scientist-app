import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import LoginButton from "../../components/LoginButton/LoginButton";
import PapersField from "../../components/PapersField/PapersField";
import UserNavBar from "../../components/UserNavBar/UserNavBar";

export default function MainProfilePage() {
    const {data:session} = useSession();
    const router = useRouter()
    const currentPageOwner = router.query.userName
    
    return (
        <> {
            session?.user.name===currentPageOwner ? <h1> Your main profile page </h1> : <h1>Main profile page for {currentPageOwner}</h1> 
        }
            <UserNavBar userName={currentPageOwner}/>
            <PapersField userName={currentPageOwner}/>
            <LoginButton/>
        </>
    )
    

}