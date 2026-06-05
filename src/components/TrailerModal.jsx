import { X } from "lucide-react";

export default function TrailerModal({ trailerUrl, onClose }) {
  if (!trailerUrl) return null;

  // ubah youtube watch url → embed url
  const embedUrl = trailerUrl
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "youtube.com/embed/");

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 px-4"
      // onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white cursor-pointer"
        >
          <X />
        </button>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="aspect-video">
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
