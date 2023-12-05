import SaveButton from './SaveButton/SaveButton'
export default function ShowCreatedProfileInfo({newUserInfo,handleSaveProfileContent,isSaved}) {
    console.log('isSaved:',isSaved);
    return (
        <>
        
        {!isSaved ?
        <section className='showContentField'>
            <h2 className='ContentField_title'>Entered info:</h2>
            <p className='ContentField_mainText'>{newUserInfo.fullName}</p>
            <SaveButton onSave={handleSaveProfileContent} isSaved={isSaved} />
        </section> 
            :
        <section className='ContentField'>
            <SaveButton onSave={handleSaveProfileContent} isSaved={isSaved} />
            <h2 className='ContentField_title'>Entered info:</h2>
            <p className='ContentField_mainText'>{newUserInfo.fullName}</p>
        </section>}
        </>
    )
}