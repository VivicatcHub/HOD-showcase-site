import Image from "next/image";
import iconLarge from "@/public/icon-512.png";
import logoSmall from "@/public/logo-128.png";

const sizes = {
  sm: { src: logoSmall, className: "h-8 w-8" },
  lg: { src: iconLarge, className: "h-32 w-32" },
};

type BrandLogoProps = {
  size?: keyof typeof sizes;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  size = "sm",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const { src, className: sizeClassName } = sizes[size];

  return (
    <Image
      src={src}
      alt=""
      className={`${sizeClassName} object-contain ${className}`}
      priority={priority}
    />
  );
}

export function BrandLoader({ label = "Chargement…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-16"
    >
      <BrandLogo
        size="lg"
        className="h-24 w-24 drop-shadow-[0_0_25px_rgba(157,92,255,0.45)] motion-safe:animate-pulse"
      />
      <span className="text-sm text-[#9E9BB8]">{label}</span>
    </div>
  );
}
