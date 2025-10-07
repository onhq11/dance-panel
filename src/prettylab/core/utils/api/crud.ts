export async function list<T>(
  url: string,
  params?: Record<string, any>,
): Promise<{ data: T[]; meta: any }> {
  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)]),
      )
    : "";
  const res = await fetch(url + qs, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function read<T>(
  url: string,
  id: string | number,
): Promise<{ data: T }> {
  const res = await fetch(`${url}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function create<T>(url: string, body: any): Promise<{ data: T }> {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function update<T>(
  url: string,
  id: string | number,
  body: any,
): Promise<{ data: T }> {
  const res = await fetch(`${url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function remove(url: string, id: string | number): Promise<void> {
  const res = await fetch(`${url}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}
