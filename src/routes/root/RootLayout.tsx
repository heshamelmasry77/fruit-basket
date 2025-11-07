import { Link, Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40";

  return (
    <div className="min-h-dvh flex flex-col bg-gray-50 text-gray-800">
      {/* Sticky, subtle blur, thin top brand bar */}
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-gray-300">
        <div className="h-0.5 w-full bg-brand" />
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          {/* Brand mark + title */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white text-sm font-bold">
              FB
            </span>
            <span className="text-lg font-semibold">Fruit Basket</span>
          </Link>

          {/* Simple pill nav with clear active state */}
          <nav className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "bg-brand text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-brand-dark"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/scan"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "bg-brand text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-brand-dark"
                }`
              }
            >
              Scan
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl w-full px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
