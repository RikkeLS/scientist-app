export default function ShowCreatedProfileInfo({newUserInfo}) {
    return (
        <>
        <section className='createdProfileInfo'>
            <h2 className='createdProfileInfo-title'>Entered info:</h2>
            <p >{newUserInfo.fullName}</p>
        </section>
        </>
    )
}