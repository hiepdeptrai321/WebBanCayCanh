import { toast } from "react-toastify";

function ConfirmToast({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-800">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export function showConfirmToast({
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
} = {}) {
  return new Promise((resolve) => {
    let isSettled = false;
    let toastId = null;

    const settle = (value) => {
      if (isSettled) {
        return;
      }

      isSettled = true;
      toast.dismiss(toastId);
      resolve(value);
    };

    toastId = toast.warn(
      <ConfirmToast
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={() => settle(true)}
        onCancel={() => settle(false)}
      />,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        onClose: () => settle(false),
      },
    );
  });
}
