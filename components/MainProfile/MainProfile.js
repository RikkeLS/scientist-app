import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import PapersField from "../../components/PapersField/PapersField";
import ProfileContentForm from "../../components/ProfileContentForm/ProfileContentForm";
import { useState } from "react";
import ShowEntryData from "../../components/ShowEntryData/ShowEntryData";
import Image from "next/image"
import useSWR from "swr"

export default function MainProfile() {
    const {data:session} = useSession();
    const router = useRouter();
    const currentPageOwner = router.query.userName;
    const [entry, setEntry] = useState();
    const [isContentSaved,setIsContentSaved] = useState(false);
    const { data:papers, isLoading:isLoadingPapers, error:errorPapers } = useSWR(`/api/${currentPageOwner}/papers`)
    const {data:userInfo,isLoading:isLoadingUserInfo,error:errorUserInfo} = useSWR(`/api/${currentPageOwner}/userInfo`)
    const {data:entries,isLoading:isLoadingEntries,error:errorEntries,mutate:mutateEntries} = useSWR(`/api/${currentPageOwner}/profileEntries`)
    if (isLoadingUserInfo || errorUserInfo) return <h2>Loading...</h2>;
    if (isLoadingEntries || errorEntries) return <h2>Loading...</h2>;

   function getProfileContent(entryData) {
        setEntry(entryData)
    }
    async function handleSaveProfileContent() {
        const response = await fetch(`/api/${currentPageOwner}/profileEntries`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(entry)
        },)
        if (response.ok) {
            setIsContentSaved(true)
            let timeout;
            function MyTimeOut() {
                timeout = setTimeout(afterSavePause,1500)
            }
            function afterSavePause() {
                setEntry(null)
                setIsContentSaved(false)
                mutateEntries()
            }
            MyTimeOut()
        }
    }
    
    return (
        <> {
            session?.user.name===currentPageOwner ? <h1> Your main profile page </h1> : <h1>Main profile page for {currentPageOwner}</h1> 
        }
        <Image
                src={userInfo.profileImageURL}
                alt="profile image"
                width={100}
                height={100}
                />
        {session?.user.name===currentPageOwner &&
        <ProfileContentForm getProfileContent={getProfileContent} papers={papers}/> }
        {entry && 
        <ShowEntryData entry={entry}
            handleSaveProfileContent={handleSaveProfileContent}
            isSaved={isContentSaved} />}
        { entries &&
            entries.map(entry=>
            <ShowEntryData key={entry._id} entry={entry}
            handleSaveProfileContent={handleSaveProfileContent}/>
            )
        }

            <PapersField papers={papers} isLoadingPapers={isLoadingPapers} errorPapers={errorPapers}/>
        </>
    )
}