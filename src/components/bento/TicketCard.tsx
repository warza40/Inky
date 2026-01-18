import Image from "next/image"
import Link from "next/link"

type TicketCardProps = {
  title: string
  subtitle?: string
  tag: string
  image: string
  href: string
}

export function TicketCard({
  title,
  subtitle,
  tag,
  image,
  href,
}: TicketCardProps) {
  return (
    <article
      className="
        relative
        flex flex-col
        h-full
        rounded-2xl
        bg-white
        shadow-sm
        p-6
        overflow-hidden
        border border-neutral-200/50
        transition-shadow hover:shadow-md
      "
    >
      {/* IMAGE */}
      <div
        className="
          mb-5
          h-[140px]
          w-full
          overflow-hidden
          rounded-xl
          bg-neutral-100
        "
      >
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-3 flex-1">
        {/* Tag */}
        <span className="inline-block text-xs font-medium text-neutral-500 uppercase tracking-wide">
          {tag}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 leading-tight">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-neutral-600 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Link */}
        <Link
          href={href}
          className="mt-auto text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
        >
          View project →
        </Link>
      </div>
    </article>
  )
}
