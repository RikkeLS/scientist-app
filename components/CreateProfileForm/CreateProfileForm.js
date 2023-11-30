import {useSession} from 'next-auth/react'

export default function CreateProfileForm({}) {
    const {data:session} = useSession();
    return (
        <h1>make the form for user: {session?.user?.name}</h1>
    )
}