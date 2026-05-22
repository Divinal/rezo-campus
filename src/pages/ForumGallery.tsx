import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Images } from 'lucide-react';

interface PhotoGroup {
  name: string;
  emoji: string;
  photos: string[];
}

const groups: PhotoGroup[] = [
  {
    name: "Retour sur le Forum du 16 mai 2026",
    emoji: "📸",
    photos: [
      "Ambassade.jpeg",
      "Descente.jpeg",
      "Ecole.jpeg",
      "Equipe28.jpeg",
      "Equipe29.jpeg",
      "Equipe30.jpeg",
      "Sorbonne.jpeg",
      "Sorbonne2.jpeg",
      "WhatsApp Image 2026-05-17 at 17.01.59.jpeg",
      "WhatsApp Image 2026-05-17 at 17.01.59 (1).jpeg",
      "WhatsApp Image 2026-05-17 at 17.01.59 (2).jpeg",
      "WhatsApp Image 2026-05-17 at 17.02.12.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.20.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.20 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.21.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.21 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.22.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.22 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.23.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.23 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.24.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.24 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.25.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.25 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.26.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.26 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.27.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.28.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.28 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.28 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.29.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.29 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.29 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.30.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.30 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.31.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.31 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.31 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.32.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.32 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.33.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.33 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.33 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.34.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.34 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.34 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.35.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.35 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.35 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.36.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.36 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.36 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.37.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.37 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.37 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.38.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.39.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.40.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.40 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.40 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.41.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.41 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.42.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.42 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.43.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.43 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.44.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.44 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.44 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.45.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.45 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.45 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.46.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.46 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.46 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.47.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.47 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.47 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.48.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.48 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.48 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.49.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.49 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.50.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.50 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.50 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.51.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.51 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.51 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.52.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.52 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.52 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.53.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.53 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.53 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.54.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.54 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.55.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.55 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.55 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.56.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.56 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.56 (2).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.57.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.57 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.58.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.58 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.59.jpeg",
      "WhatsApp Image 2026-05-22 at 18.59.59 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 19.00.00.jpeg",
      "WhatsApp Image 2026-05-22 at 19.00.00 (1).jpeg",
      "WhatsApp Image 2026-05-22 at 19.00.01.jpeg",
    ],
  },
];

// Flat list of all photos for lightbox navigation
const allPhotos = groups.flatMap((g) => g.photos);

interface LightboxState {
  globalIndex: number;
}

const ForumGallery: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<Set<number>>(new Set());
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const toggleGroup = (index: number) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const openLightbox = (photo: string) => {
    const globalIndex = allPhotos.indexOf(photo);
    setLightbox({ globalIndex });
  };

  const closeLightbox = () => setLightbox(null);

  const prev = () => {
    if (!lightbox) return;
    setLightbox({ globalIndex: (lightbox.globalIndex - 1 + allPhotos.length) % allPhotos.length });
  };

  const next = () => {
    if (!lightbox) return;
    setLightbox({ globalIndex: (lightbox.globalIndex + 1) % allPhotos.length });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Titre */}
      <section className="bg-primary text-white py-10 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-2">Forum Rézo Campus</h1>
        <p className="text-lg text-white/80">Retrouvez les meilleurs moments du forum en photos et en vidéo</p>
      </section>

      {/* Bannière vidéo YouTube */}
      <section className="w-full bg-black flex justify-center items-center py-6 px-4">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full rounded-xl shadow-2xl"
            src="https://www.youtube.com/embed/j0P0o6kOt2s?rel=0&autoplay=1&mute=1"
            title="Forum Rézo Campus – Vidéo officielle"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Groupes de photos */}
      <section className="container mx-auto px-4 py-12 space-y-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
          Galerie Photos — {allPhotos.length} photos
        </h2>

        {groups.map((group, groupIndex) => {
          const isOpen = openGroups.has(groupIndex);
          return (
            <div
              key={groupIndex}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              {/* En-tête du groupe — cliquable */}
              <button
                onClick={() => toggleGroup(groupIndex)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors duration-200 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{group.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <Images className="w-3.5 h-3.5" />
                      {group.photos.length} photo{group.photos.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Aperçu miniatures quand fermé */}
                  {!isOpen && (
                    <div className="hidden sm:flex -space-x-2">
                      {group.photos.slice(0, 4).map((photo, i) => (
                        <img
                          key={i}
                          src={`/Forums/${encodeURIComponent(photo)}`}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                        />
                      ))}
                      {group.photos.length > 4 && (
                        <div className="w-10 h-10 rounded-full bg-primary text-white text-xs flex items-center justify-center border-2 border-white shadow font-bold">
                          +{group.photos.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </div>
              </button>

              {/* Grille de photos — affichée si le groupe est ouvert */}
              {isOpen && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-gray-100 mb-5" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {group.photos.map((photo, photoIndex) => (
                      <button
                        key={photoIndex}
                        onClick={() => openLightbox(photo)}
                        className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary aspect-square"
                      >
                        <img
                          src={`/Forums/${encodeURIComponent(photo)}`}
                          alt={`${group.name} – photo ${photoIndex + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-secondary transition-colors z-10 p-2"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 text-white hover:text-secondary transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={`/Forums/${encodeURIComponent(allPhotos[lightbox.globalIndex])}`}
            alt={`Photo ${lightbox.globalIndex + 1}`}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 text-white hover:text-secondary transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 text-white/70 text-sm">
            {lightbox.globalIndex + 1} / {allPhotos.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ForumGallery;
