import Link from "next/link";
import Image from "next/image";
import { galleryItems, type GalleryItem } from "@/components/ai-portfolio/gallery";

function Tile({ item, lazy = true }: { item: GalleryItem; lazy?: boolean }) {
  return (
    <Link
      href={`/ai-portfolio/${item.slug}/`}
      className="card marquee-tile block overflow-hidden"
      title={item.alt}
    >
      <div className="frame">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          unoptimized
          loading={lazy ? "lazy" : undefined}
          sizes="340px"
          className="object-contain"
        />
      </div>
      <div className="border-t border-ap-line px-4 py-3">
        <p className="label truncate text-ap-ink-faint">
          {item.repoTitle.replace("MasterFabric · ", "")}
        </p>
      </div>
    </Link>
  );
}

/**
 * Even strip of real charts/diagrams. Slow marquee; under reduced motion the
 * duplicate set is hidden and the strip is a static, evenly spaced row.
 */
export function Gallery() {
  return (
    <div className="marquee" role="region" aria-label="Measured charts and diagrams">
      <div className="marquee-track">
        {galleryItems.map((item) => (
          <Tile key={item.src} item={item} />
        ))}
        {galleryItems.map((item) => (
          <div key={`d-${item.src}`} className="marquee-dup" aria-hidden>
            <div className="pointer-events-none" inert>
              <Tile item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
