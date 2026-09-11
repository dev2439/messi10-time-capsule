export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function excerpt(text: string, max = 140) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trimEnd()}…`;
}

export function rpcError(error: { message?: string } | null) {
  if (!error?.message) return "Something went wrong. Please try again.";
  const raw = error.message.replace(/^.*ERROR:\s*/i, "").split("\n")[0];
  return raw || "Something went wrong. Please try again.";
}
