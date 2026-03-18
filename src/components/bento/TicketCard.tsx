import Image from "next/image"
import Link from "next/link"

type TicketCardProps = {
  title: string
  subtitle?: string
  tag: string
  image: string
  href: string
  /** Optional accent background (e.g. bg-rose-50 border-rose-200/80) */
  className?: string
}

export function TicketCard({
  title,
  subtitle,
  tag,
  image,
  href,
  className,
}: TicketCardProps) {
  return (
    <Link
      href={href}
      className={`
        relative
        flex flex-col
        h-full
        rounded-2xl
        bg-white dark:bg-neutral-800
        shadow-sm
        p-6
        overflow-hidden
        border-2 border-neutral-200 dark:border-white/30
        transition-all duration-200
        cursor-pointer
        hover:shadow-md
        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[var(--background)] dark:focus:ring-offset-neutral-900
        active:border-primary active:ring-2 active:ring-primary active:ring-offset-2 active:ring-offset-[var(--background)] dark:active:ring-offset-neutral-900 active:bg-primary/5 dark:active:bg-primary/10
        ${className ?? ""}
      `.trim()}
    >
      <span className="inline-flex w-fit items-center rounded-full border border-neutral-800 dark:border-neutral-400 px-3 py-1 text-xs font-medium text-neutral-800 dark:text-neutral-100 mb-4">
        CASE STUDY
      </span>
      <div className="mb-4 h-[120px] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-700">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
          {tag}
        </span>
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  )
}
