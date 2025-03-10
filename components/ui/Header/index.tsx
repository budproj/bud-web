import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full bg-zinc-100 h-20 flex items-center px-8 justify-between">
      <div className="flex flex-row gap-8">
        <Image src={"./bud-logotype.svg"} alt="BUD" width={60} height={26} />
        <nav>
          <ul className="flex gap-8">
            <li>
                <Link href="/">Painel</Link>
            </li>
            <li>
              <Link href="/my-things">Minhas Coisas</Link>
            </li>
            <li>
              <a href="#">Times</a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
