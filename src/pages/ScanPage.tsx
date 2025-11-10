import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add, remove, clear, type ItemCode } from "@/store/slices/basketSlice";
import { calculateItemSubtotal, calculateTotal } from "@/lib/pricing/engine";
import { CATALOG } from "@/lib/pricing/fixtures";

const items: ItemCode[] = ["apple", "banana", "peach", "kiwi"];

function getUnitPrice(code: ItemCode): number {
  const item = CATALOG.find((i) => i.code === code);
  if (!item) {
    return 0;
  }
  return item.unitPrice;
}

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

      {/* Add buttons (bigger targets, clear focus, pointer cursor) */}
      <div className="flex flex-wrap gap-2">
        {items.map((code) => (
          <button
            key={code}
            onClick={() => handleAdd(code)}
            className="cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            aria-label={`Add one ${code}`}
          >
            + {code}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          aria-label="Clear all items from basket"
        >
          Clear
        </button>
      </div>

      {/* Simple list with +/- (ensure ~44x44 targets, pointer, disabled styles, focus ring) */}
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
                  data-testid={`remove-${code}`}
                  onClick={() => handleRemove(code)}
                  className="cursor-pointer rounded border text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 h-11 w-11"
                  aria-label={`Remove one ${code}`}
                  disabled={!canRemove}
                >
                  −
                </button>

                <span
                  data-testid={`count-${code}`}
                  className="w-10 text-center tabular-nums"
                  aria-live="polite"
                  aria-label={`${code} quantity`}
                >
                  {count}
                </span>

                <button
                  data-testid={`add-${code}`}
                  onClick={() => handleAdd(code)}
                  className="cursor-pointer rounded border text-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 h-11 w-11"
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
        <span className="text-sm text-gray-700">Total</span>
        <strong
          data-testid="total"
          className="text-lg tabular-nums"
          aria-live="polite"
          aria-label={`Total price ${total}`}
        >
          {total}
        </strong>
      </div>

      {/* Summary section with clear discount badge */}
      {items.some((code) => counts[code] > 0) && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Summary</h3>

          <ul className="text-sm space-y-2">
            {items.map((code) => {
              const qty = counts[code];
              if (qty <= 0) {
                return null;
              }

              const unit = getUnitPrice(code);
              const normal = unit * qty;
              const subtotal = calculateItemSubtotal(code, qty, CATALOG);
              const saved = normal - subtotal;
              const hasDiscount = saved > 0;

              return (
                <li key={code} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="capitalize">
                      {code} × {qty}
                    </span>

                    {hasDiscount && (
                      <span
                        data-testid={`saved-${code}`}
                        className="rounded-full bg-brand/10 text-brand px-2 py-0.5 text-xs"
                        aria-label={`Discount applied, saved ${saved}`}
                      >
                        saved {saved}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Show normal price only if there is a discount */}
                    {hasDiscount && (
                      <span className="text-gray-600 line-through tabular-nums">{normal}</span>
                    )}
                    <strong className="tabular-nums">{subtotal}</strong>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
