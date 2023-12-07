import Highlights from  '@/components/Highlights/Highlights'
import LoginButton from "../../components/LoginButton/LoginButton";
import Link from "next/link";
import UserNavBar from '../../components/UserNavBar/UserNavBar';

export default function HighlightsPage() {
    return (
        <>
        <UserNavBar/>
        <Highlights/>
        <LoginButton/>
        <Link href={'/'}>Go to homepage</Link>
        </>
    )
}