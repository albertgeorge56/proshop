import { Link } from 'react-router'

export default function Home() {
  return (
    <div className="h-full w-full justify-center items-center flex">
      <Link to="Login">Login page</Link>
    </div>
  )
}
