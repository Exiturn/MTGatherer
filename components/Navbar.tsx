import { auth } from "@/auth/auth";
import { SessionUserT } from "@/types";
import ProfileWidget from "./ProfileWidget";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="w-full px-4 py-4 flex justify-between">
      <div className="flex items-center gap-x-10">
        <figure className="font-medium text-xl text-[var(--foreground)] flex items-center">
          <span className="text-[#c93814]">MTG</span>atherer
        </figure>

        <ul className="flex items-center justify-center gap-x-10">
          <li className="cursor-pointer">
            <a href="/">Home</a>
          </li>
          <li className="cursor-pointer">
            <a href="">Vault</a>
          </li>
          <li className="cursor-pointer">
            <a href="">Collections</a>
          </li>
        </ul>
      </div>

      {session?.user ? (
        <div className="flex gap-5">
          <ProfileWidget user={session?.user as SessionUserT} />
          <button>
            <a href="/api/auth/signout">Logout</a>
          </button>
        </div>
      ) : (
        <button>
          <a href="/api/auth/signin">Login</a>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
