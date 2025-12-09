import { useState, useEffect, ReactNode } from "react";

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<ReactNode>("Are you sure?");
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null
  );

  const confirm = (msg: ReactNode = "Are you sure?") =>
    new Promise<boolean>((resolve) => {
      setMessage(msg);
      setIsOpen(true);
      setResolver(() => resolve);
    });

  const handleConfirm = () => {
    if (resolver) resolver(true);
    setIsOpen(false);
  };

  // If user cancels:
  const handleCancel = () => {
    if (resolver) resolver(false);
    setIsOpen(false);
  };

  // 🔥 Add ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, resolver]); // listen only when dialog is open

  const ConfirmDialog = () =>
    isOpen ? (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-neutral-900 p-6 rounded-xl w-80 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Confirm</h2>
          <p className="text-neutral-300 mb-6">{message}</p>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
              onClick={handleConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ) : null;

  return { confirm, ConfirmDialog };
}
