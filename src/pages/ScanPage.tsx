import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add, remove, clear, type ItemCode } from "@/store/slices/basketSlice";

const items: ItemCode[] = ["apple", "banana", "peach", "kiwi"];

export default function ScanPage() {
  const dispatch = useAppDispatch();
  const counts = useAppSelector((s) => s.basket.counts);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Scan Items</h2>

      {/* Add buttons */}
      <div className="flex flex-wrap gap-2">
        {items.map((code) => (
          <button
            key={code}
            onClick={() => dispatch(add(code))}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
            aria-label={`Add ${code} to basket`}
          >
            + {code}
          </button>
        ))}
        <button
          onClick={() => dispatch(clear())}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
          aria-label="Clear all items from basket"
        >
          Clear
        </button>
      </div>

      {/* Simple list with +/- */}
      <ul className="space-y-2">
        {items.map((code) => (
          <li key={code} className="flex items-center justify-between rounded-md border px-3 py-2">
            <span className="capitalize">{code}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(remove(code))}
                className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
                aria-label={`Remove one ${code} from basket`}
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{counts[code]}</span>
              <button
                onClick={() => dispatch(add(code))}
                className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
                aria-label={`Add one ${code} to basket`}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
