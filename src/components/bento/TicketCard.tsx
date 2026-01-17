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
        rounded-[24px]
        border border-neutral-200
        bg-transparent
        p-4
        overflow-hidden
      "
    >
      {/* TOP NOTCH */}
      <span
        aria-hidden
        className="
          absolute
          top-0 left-1/2
          h-6 w-12
          -translate-x-1/2 -translate-y-1/2
          rounded-b-full
          bg-transparent
          border border-neutral-200
          border-t-0
        "
      />

      {/* BOTTOM NOTCH */}
      <span
        aria-hidden
        className="
          absolute
          bottom-0 left-1/2
          h-6 w-12
          -translate-x-1/2 translate-y-1/2
          rounded-t-full
          bg-transparent
          border border-neutral-200
          border-b-0
        "
      />

      {/* IMAGE */}
      <div
        className="
          mb-4
          h-[100px]
          w-full
          overflow-hidden
          rounded-[16px]
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
      <div className="flex flex-col gap-2">
        <h3 className="text-[16px] font-semibold leading-tight">
          {title}
        </h3>

        {subtitle && (
          <p className="text-[14px] text-neutral-600 leading-snug">
            {subtitle}
          </p>
        )}

        <span className="text-[12px] text-neutral-500">
          {tag}
        </span>

        <Link
          href={href}
          className="mt-1 text-[14px] font-medium text-neutral-900"
        >
          View project →
        </Link>
      </div>
    </article>
  )
}
