export default function PageHeader({ title, back = false, rightSlot = null }) {
  return (
    <header className="sticky top-0 z-10 bg-background-light dark:bg-background-dark">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="w-10">
          {back ? (
            <button className="p-2">
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
          ) : null}
        </div>
        <h1 className="text-lg font-bold text-center flex-1">{title}</h1>
        <div className="w-10">{rightSlot}</div>
      </div>
    </header>
  );
}
