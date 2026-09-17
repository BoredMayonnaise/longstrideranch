export {};

declare global {
  interface Window {
    /** Set by SiteEffects so the layout's failsafe knows the bundle arrived. */
    __lsrReady?: boolean;
  }
}
