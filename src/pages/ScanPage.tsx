import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add, remove, clear, type ItemCode } from "@/store/slices/basketSlice";
import { CATALOG } from "@/lib/pricing/fixtures";
import { calculateTotal } from "@/lib/pricing/engine";

const items: ItemCode[] = ["apple", "banana", "peach", "kiwi"];

export default function ScanPage() {
  const dispatch = useAppDispatch();
  const counts = useAppSelector((s) => s.basket.counts);

  function handleAdd(code: ItemCode) {
    dispatch(add(code));
  }

  function handleRemove(code: ItemCode) {
    const current = counts[code];
    if (current <= 0) {
      return;
    }
    dispatch(remove(code));
  }

  function handleClear() {
    dispatch(clear());
  }

  const total = calculateTotal(counts, CATALOG);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Scan Items</h2>

      {/* Add buttons */}
      <div className="flex flex-wrap gap-2">
        {items.map((code) => (
          <button
            key={code}
            onClick={() => handleAdd(code)}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
            aria-label={`Add one ${code}`}
          >
            + {code}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
          aria-label="Clear all items from basket"
        >
          Clear
        </button>
      </div>

      {/* Simple list with +/- */}
      <ul className="space-y-2">
        {items.map((code) => {
          const count = counts[code];
          const canRemove = count > 0;

          return (
            <li
              key={code}
              className="flex items-center justify-between rounded-md border px-3 py-2"
            >
              <span className="capitalize">{code}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRemove(code)}
                  className="rounded border px-2 py-1 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Remove one ${code}`}
                  disabled={!canRemove}
                >
                  −
                </button>

                <span
                  className="w-8 text-center tabular-nums"
                  aria-live="polite"
                  aria-label={`${code} quantity`}
                >
                  {count}
                </span>

                <button
                  onClick={() => handleAdd(code)}
                  className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
                  aria-label={`Add one ${code}`}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Total section */}
      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-gray-600">Total</span>
        <strong
          className="text-lg tabular-nums"
          aria-live="polite"
          aria-label={`Total price ${total}`}
        >
          {total}
        </strong>
      </div>
    </section>
  );
}
