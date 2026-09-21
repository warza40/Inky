/** Substack mark — simplified for 20px social tiles. */
export function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M3 4.5H17V6.5H3V4.5ZM3 8.5H17V17.5H3V8.5Z" fill="currentColor" />
      <path d="M3 3H17V4H3V3Z" fill="currentColor" />
    </svg>
  );
}
