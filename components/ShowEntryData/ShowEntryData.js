import SaveButton from '../SaveButton/SaveButton';
import ArrowsToChangePosition from '../ArrowsToChangePosition/ArrowsToChangePosition';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ShowEntryData({entry,handleChangePosition,numberOfEntries,handleSaveProfileContent,isSaved}) {
    const {data:session} = useSession();
    const router = useRouter();
    const currentPageOwner = router.query.userName;
    //--add space after comma:
    let formattedEntryText
    if (entry.title.toLowerCase()==='collaborators') {
        const textToFormat = entry.mainText.split(',')
        formattedEntryText = textToFormat.map((words,index) => index!==textToFormat.length-1 ? `${words}, `: `${words}` )
    }
    return (
        <>
        <section className={isSaved===undefined ?`ContentField`:`ContentField toSave`}>
            <SaveButton onSave={handleSaveProfileContent} isSaved={isSaved} itemSaved={'entry'} />
            {session?.user.name===currentPageOwner && (entry._id &&
            <ArrowsToChangePosition 
            handleChangePosition={handleChangePosition}
            entryID={entry._id}
            numberOfEntries={numberOfEntries}   
            rowNumber={entry.rowNumber} 
            />)
            } 
            <h2 className='ContentField_title'>{entry.title}:</h2>
            {formattedEntryText ? <p className='ContentField_mainText'>{formattedEntryText}</p>
            : 
            <p className='ContentField_mainText'>{entry.mainText}</p> 
            }
            
        </section> 

        </>
    )
}