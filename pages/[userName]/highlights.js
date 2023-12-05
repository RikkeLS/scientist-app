import Highlights from  '@/components/Highlights/Highlights'
import LoginButton from "../../components/LoginButton/LoginButton";
import Link from "next/link";
export default function HighlightsPage() {
    return (
        <>
        <Highlights/>
        <LoginButton/>
        <Link href={'/'}>Go to homepage</Link>
        </>
    )
}