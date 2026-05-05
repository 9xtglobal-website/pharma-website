import { Ingredient } from "@/types";

interface IngredientTableProps {
  ingredients: Ingredient[];
}

export default function IngredientTable({ ingredients }: IngredientTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-grey-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-brand-grey-50">
            <th className="px-4 py-3 text-left font-semibold text-brand-grey-700">Ingredient</th>
            <th className="px-4 py-3 text-right font-semibold text-brand-grey-700">Amount</th>
            {ingredients.some((i) => i.rdaPercent) && (
              <th className="px-4 py-3 text-right font-semibold text-brand-grey-700">% RDA</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-grey-100">
          {ingredients.map((ingredient, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-brand-grey-50/50" : ""}>
              <td className="px-4 py-3">
                <span className="font-medium text-brand-grey-800">{ingredient.name}</span>
                {ingredient.commonName && (
                  <span className="ml-1 text-brand-grey-400">({ingredient.commonName})</span>
                )}
              </td>
              <td className="px-4 py-3 text-right font-medium text-brand-grey-700">
                {ingredient.amount}
              </td>
              {ingredients.some((ing) => ing.rdaPercent) && (
                <td className="px-4 py-3 text-right text-brand-grey-500">
                  {ingredient.rdaPercent || "—"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
