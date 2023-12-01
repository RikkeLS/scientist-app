export default function ShowCreatedProfileInfo({newUserInfo}) {
    return (
        <>
            <h2>Entered info:</h2>
            <p>{newUserInfo.fullName}</p>
        </>
    )
}