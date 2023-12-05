import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import PapersField from "../../components/PapersField/PapersField";
import UserNavBar from "../../components/UserNavBar/UserNavBar";
import ProfileContentForm from "../../components/ProfileContentForm/ProfileContentForm";
import { useState } from "react";
import ShowEntryData from "../../components/ShowEntryData/ShowEntryData";
import useSWR from "swr";

export default function MainProfile() {
    const [papers,setPapers] = useState();
    const {data:session} = useSession();
    const router = useRouter();
    const currentPageOwner = router.query.userName;
    const [entry, setEntry] = useState();
    const [isContentSaved,setIsContentSaved] = useState(false);

    // const {mutate} = useSWR(`/api/${currentPageOwner}/profileEntries`)

   function getProfileContent(entryData) {
        setEntry(entryData)
    }
    async function handleSaveProfileContent() {
        console.log('..saving to db..');
        const response = fetch(`/api/${currentPageOwner}/profileEntries`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(entry)
        },
        )
        if (response.ok) {
            setIsContentSaved(true)
            // console.log('content is saved:',isContentSaved)
            // console.log('response status:',response.status);
            // mutate()
        }
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
            <ProfileContentForm getProfileContent={getProfileContent} papers={papers}/> }
            {entry ? <ShowEntryData entry={entry} handleSaveProfileContent={handleSaveProfileContent} isSaved={isContentSaved} />:''}
            <PapersField getPapers={getPapers} userName={currentPageOwner}/>
        </>
    )
    

}