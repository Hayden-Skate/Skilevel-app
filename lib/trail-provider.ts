export type TrailResult = { externalId: string; name: string; mountain: string; difficulty?: string };

/** Trail data provider boundary. Manual entry remains available without credentials. */
export async function searchTrails(query: string, mountain?: string): Promise<TrailResult[]> {
  const endpoint = process.env.TRAIL_DATA_API_URL;
  const apiKey = process.env.TRAIL_DATA_API_KEY;
  if (!endpoint || !apiKey) return [];
  const url = new URL('/trails/search', endpoint);
  url.searchParams.set('q', query);
  if (mountain) url.searchParams.set('mountain', mountain);
  const response = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
  if (!response.ok) throw new Error('Trail provider request failed');
  return response.json() as Promise<TrailResult[]>;
}
