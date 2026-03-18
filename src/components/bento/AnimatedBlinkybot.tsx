"use client";

import Image from "next/image";
import Link from "next/link";

const SIZE = 100;

export function AnimatedBlinkybot() {
  return (
    <div className="mb-6 relative overflow-visible" style={{ height: SIZE }}>
      <div className="absolute left-0">
        <Link href="/" className="block">
          <Image
            src="/blinkybot.gif"
            alt="Rachana Mandal"
            width={SIZE}
            height={SIZE}
            priority
            className="object-contain"
            style={{ width: SIZE, height: SIZE }}
          />
        </Link>
      </div>
    </div>
  );
}
