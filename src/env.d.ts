interface ImportMetaEnv {
  readonly VITE_ARCANE_STORYTELLER_URL?: string;
  readonly VITE_ARCANE_STORYTELLER_KEY?: string;
  readonly VITE_ARCANE_STORYTELLER_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
