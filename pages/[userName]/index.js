import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import LoginButton from "../../components/LoginButton/LoginButton";
import PapersField from "../../components/PapersField/PapersField";
import UserNavBar from "../../components/UserNavBar/UserNavBar";
import Link from "next/link";
import ProfileContentForm from "../../components/ProfileContentForm/ProfileContentForm";
import { useState } from "react";
import ShowEntryData from "../../components/ShowEntryData/ShowEntryData";

export default function MainProfilePage() {
    const [papers,setPapers] = useState()
    const {data:session} = useSession();
    const router = useRouter()
    const currentPageOwner = router.query.userName
    
    const [entry, setEntry] = useState()


    function handleAddProfileContent(entryData) {
        console.log('entryData',entryData);
        setEntry(entryData)
    }


    function getPapers(papersFromComponent) {
        setPapers(papersFromComponent)
    }

    return (
        <> {
            session?.user.name===currentPageOwner ? <h1> Your main profile page </h1> : <h1>Main profile page for {currentPageOwner}</h1> 
        }
            <UserNavBar userName={currentPageOwner}/>
            {session?.user.name===currentPageOwner &&
            <ProfileContentForm handleAddProfileContent={handleAddProfileContent} papers={papers}/> }
            {entry ? <ShowEntryData entry={entry}/>:''}
            <PapersField getPapers={getPapers} userName={currentPageOwner}/>

            <LoginButton/>
            <Link href={'/'}>Go to homepage</Link>
        </>
    )
    

}