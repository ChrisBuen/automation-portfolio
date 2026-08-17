export interface ExternalLinks {
  github?: string;
  booking?: string;
}

function validHttpsUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString().replace(/\/$/, "") : undefined;
  } catch {
    return undefined;
  }
}

export const externalLinks: ExternalLinks = {
  github: validHttpsUrl(import.meta.env.PUBLIC_GITHUB_URL),
  booking: validHttpsUrl(import.meta.env.PUBLIC_BOOKING_URL),
};
