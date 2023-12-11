import {useSession} from 'next-auth/react'
import Image from 'next/image';
import StyledButton from '../StyledButton/StyledButton'

export default function CreateProfileForm({onCreateNewUser}) {
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
        //add providerPic:
        data['profileImageURL'] = session.user.image
        onCreateNewUser(data)
    }

    return (
        <>
        <form className='form createUser-form' onSubmit={handleSubmit}>
            <label htmlFor='fullName'>Full name displayed on site:</label>
            <input id='fullName' name={'fullName'} />
            <label htmlFor='isProviderPic'> You want to use your Github profile picture?</label>
            <input type='checkbox' defaultChecked id='isProviderPic' name='isProviderPic' />
            <div className='profileImageContainer'><Image className='profileImage'
            src={session.user.image} 
            alt='suggested profile picture'
            width={100}
            height={100}
            /></div>
            <StyledButton type='submit'>Create Profile</StyledButton>
        </form>
        </>

    )
}