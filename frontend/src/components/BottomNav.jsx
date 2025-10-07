import { Link, useLocation } from "react-router-dom";

export default function BottomNav({ active = "home", variant = "light" }) {
  const { pathname } = useLocation();
  const isActive = (key) => active === key || pathname.includes(key);

  const base = "flex flex-col items-center gap-1 px-2 py-2 rounded-lg";
  const off =
    "text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary";
  const on = "text-primary";

  return (
    <footer className="sticky bottom-0 border-t border-zinc-200 dark:border-zinc-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm pb-safe">
      <nav className="flex justify-around items-center">
        <Link to="/" className={`${base} ${isActive("home") ? on : off}`}>
          <span className={`material-symbols-outlined ${isActive("home") ? "fill" : ""}`}>home</span>
          <span className={`text-xs ${isActive("home") ? "font-bold" : "font-medium"}`}>Home</span>
        </Link>

        <a href="#" className={`${base} ${off}`}>
          <span className="material-symbols-outlined">search</span>
          <span className="text-xs font-medium">Search</span>
        </a>

        <a href="#" className={`${base} ${off}`}>
          <span className="material-symbols-outlined">notifications</span>
          <span className="text-xs font-medium">Notifications</span>
        </a>

        <a href="#" className={`${base} ${off}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="text-xs font-medium">Profile</span>
        </a>
      </nav>
    </footer>
  );
}
