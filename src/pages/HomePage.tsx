import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="space-y-6 text-center py-16">
      <h1 className="text-4xl font-bold text-brand flex items-center justify-center gap-2">
        🍎 Welcome to Fruit Basket
      </h1>

      <p className="text-gray-700 text-base max-w-md mx-auto">
        Your simple checkout app that automatically applies discounts for multi-buy offers. Add
        fruits, see your basket grow, and watch the total update in real time.
      </p>

      <div className="pt-4">
        <Link
          to="/scan"
          className="inline-block bg-brand text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 transition-colors"
          aria-label="Start shopping now"
        >
          Start Shopping Now
        </Link>
      </div>

      <p className="text-xs text-gray-500">
        Try adding apples or bananas — multi-buy offers are applied automatically.
      </p>
    </section>
  );
}
