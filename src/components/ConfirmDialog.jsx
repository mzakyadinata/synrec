// ConfirmDialog — reusable confirmation overlay
// Props:
//   isOpen       — bool
//   title        — string
//   message      — string
//   confirmLabel — string (default "Confirm")
//   cancelLabel  — string (default "Cancel")
//   onConfirm    — function
//   onCancel     — function
//   danger       — bool (red confirm button, default true)

export default function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  danger = true,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-5 animate-[fadeUp_0.25s_ease]"
        style={{
          background: "linear-gradient(160deg, #1f1f1f 0%, #141414 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center self-start"
          style={{
            background: danger
              ? "rgba(219,31,46,0.15)"
              : "rgba(255,255,255,0.08)",
            border: danger
              ? "1px solid rgba(219,31,46,0.25)"
              : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="text-xl">{danger ? "🚪" : "❓"}</span>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-heading font-bold text-white text-lg mb-1">
            {title}
          </h2>
          {message && (
            <p className="font-body text-white/50 text-sm leading-6">
              {message}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cancel */}
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl font-heading font-semibold text-white/60 text-sm
              border border-white/10 bg-white/5
              hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            {cancelLabel}
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl font-heading font-bold text-white text-sm
              transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{
              background: danger
                ? "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)"
                : "rgba(255,255,255,0.15)",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
