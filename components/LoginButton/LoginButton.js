import { useSession, signIn, signOut} from 'next-auth/react'
import StyledButton from '../StyledButton/StyledButton';

export default function LoginButton () {
    const {data:session} = useSession();
    if (session) {
        return (
            <>
                Signed in as {session.user.name}
                <StyledButton onClick={()=> signOut()}>Sign out</StyledButton>
            </>
        )
    }
    return (
        <>
            Not signed in
            <StyledButton onClick={()=> signIn()}>Sign in</StyledButton>
        </>
    )
}