"use client";

export interface DeliveryDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

export const emptyDeliveryDetails: DeliveryDetails = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

export function isDeliveryValid(d: DeliveryDetails): boolean {
  return Boolean(
    d.name.trim() &&
      d.phone.trim().length >= 10 &&
      d.address.trim() &&
      d.city.trim() &&
      d.state.trim() &&
      d.pincode.trim().length === 6
  );
}

interface DeliveryFormProps {
  value: DeliveryDetails;
  onChange: (next: DeliveryDetails) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function DeliveryForm({
  value,
  onChange,
  onSubmit,
  onBack,
}: DeliveryFormProps) {
  const update = (patch: Partial<DeliveryDetails>) =>
    onChange({ ...value, ...patch });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDeliveryValid(value)) onSubmit();
  };

  const inputClass =
    "w-full rounded-lg border border-brand-grey-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-1 focus:ring-brand-navy";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="mb-1 flex items-center gap-2 text-xs text-brand-grey-500">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-white">
          2
        </span>
        Step 2 of 3 — Delivery details
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-brand-grey-600">
          Full Name *
        </label>
        <input
          type="text"
          required
          autoComplete="name"
          placeholder="As per your ID"
          value={value.name}
          onChange={(e) => update({ name: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-brand-grey-600">
            Phone *
          </label>
          <input
            type="tel"
            required
            autoComplete="tel"
            inputMode="numeric"
            placeholder="10-digit mobile"
            value={value.phone}
            onChange={(e) =>
              update({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-brand-grey-600">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="Optional"
            value={value.email}
            onChange={(e) => update({ email: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-brand-grey-600">
          Address *
        </label>
        <textarea
          required
          autoComplete="street-address"
          placeholder="House / flat number, street, area, landmark"
          rows={2}
          value={value.address}
          onChange={(e) => update({ address: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-brand-grey-600">
            City *
          </label>
          <input
            type="text"
            required
            autoComplete="address-level2"
            placeholder="City"
            value={value.city}
            onChange={(e) => update({ city: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-brand-grey-600">
            State *
          </label>
          <input
            type="text"
            required
            autoComplete="address-level1"
            placeholder="State"
            value={value.state}
            onChange={(e) => update({ state: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-brand-grey-600">
            Pincode *
          </label>
          <input
            type="text"
            required
            autoComplete="postal-code"
            inputMode="numeric"
            placeholder="6 digits"
            value={value.pincode}
            onChange={(e) =>
              update({
                pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
              })
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-brand-grey-600">
          Notes (optional)
        </label>
        <input
          type="text"
          placeholder="Anything we should know?"
          value={value.notes}
          onChange={(e) => update({ notes: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-brand-grey-200 px-4 py-3 text-sm font-medium text-brand-grey-600 transition-colors hover:bg-brand-grey-50"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!isDeliveryValid(value)}
          className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Payment →
        </button>
      </div>

      <p className="pt-1 text-center text-[11px] text-brand-grey-400">
        Your details are used only to ship your order.
      </p>
    </form>
  );
}
