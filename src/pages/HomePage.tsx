export default function HomePage() {
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-bold text-brand">Welcome to Fruit Basket</h1>
      <p className="text-gray-600 text-sm max-w-md">
        A clean checkout app to calculate multi-buy offers automatically.
      </p>
      <button className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark">
        Get Started
      </button>
    </section>
  );
}
