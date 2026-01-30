// UI for mapping CSV → Game

import { GAME_IMPORT_FIELDS } from "./csvImportFields";
import { CsvColumn, ImportMapping } from "./useCsvImport";

type Props = {
  isOpen: boolean;
  columns: CsvColumn[];
  mapping: ImportMapping;
  onChangeMapping: (field: string, column: string | undefined) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function CsvImportModal({
  isOpen,
  columns,
  mapping,
  onChangeMapping,
  onCancel,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Map CSV columns</h2>

        <div className="space-y-3">
          {GAME_IMPORT_FIELDS.map(({ key, label, required }) => (
            <div key={key} className="grid grid-cols-2 gap-4 items-center">
              <div className="font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </div>

              <select
                className="border rounded px-2 py-1 dark:bg-gray-800"
                value={mapping[key] ?? ""}
                onChange={(e) =>
                  onChangeMapping(key, e.target.value || undefined)
                }
              >
                <option value="">— Not mapped —</option>
                {columns.map((col) => (
                  <option key={col.name} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={onConfirm}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
