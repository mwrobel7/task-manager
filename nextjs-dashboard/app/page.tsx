import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <header>
        <nav>
          <Link href={"/settings"}>Ustawienia konta</Link>
          <Link href={"/tasks"}>Zadania</Link>
        </nav>
      </header>
      <main>
        <h1>Yay nazwa?</h1>
        <br/>
        <article>
          <p>Główna strona idkidk</p>
        </article>
    </main>
    </div>
  );
}
