import Link from "next/link"
import { useRouter } from "next/router";

export default function UserNavBar() {
    const router = useRouter();
    const currentPageOwner = router.query.userName;
    return (
        <>
        <nav>
        <ul>
            <li>
                <Link href={`/${currentPageOwner}/papers`}>Scientific papers</Link>
            </li>
            <li>
                <Link href={`/${currentPageOwner}/highlights`}>Scientific highlights/results</Link>
            </li>
        </ul>
        
        </nav>
        </>
    )
}