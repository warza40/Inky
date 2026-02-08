"use client";

import Image from "next/image";
import Link from "next/link";

export function AnimatedBlinkybot() {
  return (
    <div className="mb-6 relative h-[84px] overflow-visible">
      <div className="absolute left-0">
        <Link href="/" className="block">
          <Image
            src="/blinkybot.gif"
            alt="Rachana Mandal"
            width={84}
            height={84}
            priority
            className="w-[84px] h-[84px] object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
