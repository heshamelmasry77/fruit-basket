import { CATALOG } from "@/lib/pricing/fixtures";

export default function CatalogPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Catalog</h2>

      <ul className="rounded-md border divide-y bg-white">
        {CATALOG.map((item) => (
          <li key={item.code} className="px-3 py-3 text-sm flex flex-col gap-1">
            <span className="capitalize font-medium">{item.code}</span>
            <span>Price: {item.unitPrice}</span>

            {item.offer ? (
              <span>
                Offer: {item.offer.qty} for {item.offer.bundlePrice}
              </span>
            ) : (
              <span>Offer: —</span>
            )}
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-600">Showing all items from the in-memory catalog.</p>
    </section>
  );
}
