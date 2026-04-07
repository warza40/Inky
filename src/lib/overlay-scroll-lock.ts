/** Shared count so multiple overlays/lightboxes can stack without dropping the lock early. */
let overlayScrollLockCount = 0;

/** Call when opening a full-screen overlay; pairs with `unlockScrollForOverlay` in effect cleanup. */
export function lockScrollForOverlay(): void {
  if (typeof document === "undefined") return;
  overlayScrollLockCount += 1;
  if (overlayScrollLockCount === 1) {
    document.body.classList.add("overlay-open");
  }
}

/** Call from the same effect cleanup that locked scroll. */
export function unlockScrollForOverlay(): void {
  if (typeof document === "undefined") return;
  overlayScrollLockCount = Math.max(0, overlayScrollLockCount - 1);
  if (overlayScrollLockCount === 0) {
    document.body.classList.remove("overlay-open");
  }
}
