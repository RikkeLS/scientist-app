import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import LoginButton from "../../components/LoginButton/LoginButton";

export default function MainProfilePage() {
    const {data:session} = useSession();
    const router = useRouter()
    const currentPageOwner = router.query.userName
    if (session?.user.name===currentPageOwner){
        return (
            <>
                <h1> Your main profile page </h1>
                
                <LoginButton/>
            </>
        )
    }
    if (session?.user.name!==currentPageOwner) {
        return (
            <>  
                 <h1>Main profile page for {currentPageOwner}</h1>
                <LoginButton/>
            </>
        )
    }

}