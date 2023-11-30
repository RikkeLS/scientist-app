import Link from "next/link";

export default function Home() {

  return (
    <>
      <h1>Home Page</h1>
      <nav className="mainNavbar">
      <ul>
        <li>
        <Link href={'/papers'}>Link to Publications/papers</Link>
        </li>
        <li>
        <Link href={'/login'}>Link to login page</Link>
        </li>
      </ul>
      </nav>
    </>
  );
}
