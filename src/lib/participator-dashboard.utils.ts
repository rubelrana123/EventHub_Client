export const PAID_PAYMENT_STATUSES = new Set(["PAID", "SUCCESS"]);

export const isPaidPaymentStatus = (status?: string | null) => {
  return PAID_PAYMENT_STATUSES.has((status || "").toUpperCase());
};

export const formatDashboardCurrency = (amount: number) => {
  return `BDT ${Number(amount || 0).toLocaleString()}`;
};

export const formatDashboardDateTime = (dateString: string) => {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return "N/A";

  return parsed.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getEventStatusBadgeVariant = (
  status?: string
): "default" | "secondary" | "destructive" | "outline" => {
  switch ((status || "").toUpperCase()) {
    case "LIVE":
      return "default";
    case "UPCOMING":
      return "secondary";
    case "COMPLETED":
      return "outline";
    case "REGISTRATION_CLOSED":
      return "destructive";
    default:
      return "outline";
  }
};

export const getEventStatusClassName = (status?: string) => {
  switch ((status || "").toUpperCase()) {
    case "LIVE":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "UPCOMING":
      return "bg-cyan-100 text-cyan-700 border-cyan-200";
    case "COMPLETED":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "REGISTRATION_CLOSED":
      return "bg-rose-100 text-rose-700 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export const getPaymentStatusClassName = (status?: string) => {
  if (isPaidPaymentStatus(status)) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
};
