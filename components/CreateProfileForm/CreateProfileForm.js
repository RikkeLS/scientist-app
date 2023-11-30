import {useSession} from 'next-auth/react'
import Image from 'next/image';

export default function CreateProfileForm({}) {
    const {data:session} = useSession();

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        //make isProviderPic true / false:
        if (!data.isProviderPic) {
            data.isProviderPic=false
        } else {
            data.isProviderPic=true
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor='FullName'>Full name displayed on site:</label>
            <input id='FullName' name={'FullName'} />
            <label htmlFor='isProviderPic'> You want to use your Github profile picture?</label>
            <input type='checkbox' id='isProviderPic' name='isProviderPic' />
            <Image 
            src={session.user.image} 
            alt='suggested profile picture'
            width={50}
            height={50}
            />
            <button type='submit'>Create Profile</button>
        </form>
        </>

    )
}