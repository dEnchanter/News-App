import Link from "next/link";

function NavLink({category, isActive}) {
  return (
    <button
      // href={`/news/${category}`}
      disabled={true}
      className={`navLink ${isActive && 'disabled:bg-orange-400 underline decoration-orange-400 underline-offset-4 font-bold text-lg'}`}
    >
      {category}
    </button>
  )
}

export default NavLink