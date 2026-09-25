import { cn } from "~/lib/cn";

/** Símbolo Mosaico — placa do calendário. */
export function MosaicMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={cn(className)}
      role="img"
      aria-label="Símbolo Mosaico Nuvio"
    >
      <defs>
        <mask id="mosaicHeroCut">
          <rect width="180" height="180" fill="#fff" />
          <path
            d="M41 41h98v98H41Z"
            fill="#000"
            transform="rotate(45 90 90)"
          />
        </mask>
      </defs>
      <g mask="url(#mosaicHeroCut)">
        <rect x="0" y="0" width="82" height="82" rx="14" fill="#F4B942" />
        <rect
          x="98"
          y="0"
          width="82"
          height="82"
          rx="14"
          fill="#334155"
          stroke="#F4B942"
          strokeWidth="4"
        />
        <rect
          x="0"
          y="98"
          width="82"
          height="82"
          rx="14"
          fill="#334155"
          stroke="#F4B942"
          strokeWidth="4"
        />
        <rect x="98" y="98" width="82" height="82" rx="14" fill="#F4B942" />
      </g>
    </svg>
  );
}
