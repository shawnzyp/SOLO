import type { HeroBackgroundOption, HeroClassOption, Skill } from './types';
import type { HeroRaceOption } from '../data/races';
import { registerHeroContentModule } from './hero';

interface ModuleManifestEntry {
  id: string;
  url: string;
  name?: string;
  version?: string;
}

interface ModuleManifest {
  modules?: ModuleManifestEntry[];
}

interface HeroContentModulePayload {
  id: string;
  name: string;
  version?: string;
  races?: HeroRaceOption[];
  classes?: Array<HeroClassOption & { skillFocus?: Skill[] }>;
  backgrounds?: HeroBackgroundOption[];
}

const MODULE_MANIFEST_URL = '/modules/index.json';

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

async function fetchModuleManifest(signal?: AbortSignal): Promise<ModuleManifestEntry[]> {
  try {
    const manifest = await fetchJson<ModuleManifest>(MODULE_MANIFEST_URL, signal);
    return manifest.modules ?? [];
  } catch (error) {
    if (error instanceof Error && /404/.test(error.message)) {
      return [];
    }
    throw error;
  }
}

function sanitizeModulePayload(payload: HeroContentModulePayload): HeroContentModulePayload {
  const races = Array.isArray(payload.races) ? payload.races : [];
  const backgrounds = Array.isArray(payload.backgrounds) ? payload.backgrounds : [];
  const classes = Array.isArray(payload.classes) ? payload.classes : [];
  return {
    ...payload,
    races,
    backgrounds,
    classes,
  };
}

export async function loadConfiguredModules(signal?: AbortSignal): Promise<void> {
  if (typeof fetch !== 'function') return;

  let manifestEntries: ModuleManifestEntry[] = [];
  try {
    manifestEntries = await fetchModuleManifest(signal);
  } catch (error) {
    console.warn('Failed to load module manifest', error);
    return;
  }

  await Promise.all(
    manifestEntries.map(async (entry) => {
      try {
        const modulePayload = await fetchJson<HeroContentModulePayload>(entry.url, signal);
        const sanitized = sanitizeModulePayload(modulePayload);
        registerHeroContentModule({
          id: sanitized.id ?? entry.id,
          name: sanitized.name ?? entry.name ?? entry.id,
          races: sanitized.races,
          classes: sanitized.classes,
          backgrounds: sanitized.backgrounds,
        });
      } catch (error) {
        console.warn(`Failed to load content module ${entry.id}`, error);
      }
    }),
  );
}
