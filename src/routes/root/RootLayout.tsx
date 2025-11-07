import { Outlet, Link } from "react-router-dom";
export default function RootLayout() {
    return (
        <div>
            <header className="p-4 border-b"><Link to="/">Fruit Basket</Link></header>
            <main className="p-4"><Outlet /></main>
        </div>
    );
}