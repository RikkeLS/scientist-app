import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"

export default function UserNavBar({userName}) {
    const {data:userInfo,isLoading,error} = useSWR(`api/${userName}/userInfo`)
    if (isLoading || error) return <h2>Loading...</h2>;
    return (
        <>
        <nav>
        <ul>
            <li>
                <Image
                src={userInfo.profileImageURL}
                alt="profile image"
                width={100}
                height={100}
                />
            </li>
            <li>
                <Link href='/papers'>Papers</Link>
            </li>
        </ul>
        
        </nav>
        </>
    )
}