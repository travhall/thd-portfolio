"use client";

import { motion } from "framer-motion";

function ColorSwatch({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 w-full rounded-lg ${className}`} />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function StyleGuide() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-16"
      >
        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Typography</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Nohemi - Display</h3>
              <div className="space-y-4">
                <p className="font-nohemi text-8xl font-black">Display Text</p>
                <p className="font-nohemi text-6xl font-bold">Heading 1</p>
                <p className="font-nohemi text-5xl font-bold">Heading 2</p>
                <p className="font-nohemi text-4xl font-bold">Heading 3</p>
                <p className="font-nohemi text-3xl font-bold">Heading 4</p>
                <p className="font-nohemi text-2xl font-bold">Heading 5</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Manrope - Body</h3>
              <div className="space-y-4 max-w-2xl">
                <p className="text-xl">
                  Large body text. The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-base">
                  Regular body text. The quick brown fox jumps over the lazy
                  dog.
                </p>
                <p className="text-sm">
                  Small text. The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-xs">
                  Extra small text. The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Colors</h2>

          {/* Brand Colors */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Brand Color 1</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <ColorSwatch className="bg-brand-1-50" label="50" />
                <ColorSwatch className="bg-brand-1-100" label="100" />
                <ColorSwatch className="bg-brand-1-200" label="200" />
                <ColorSwatch className="bg-brand-1-300" label="300" />
                <ColorSwatch className="bg-brand-1-400" label="400" />
                <ColorSwatch className="bg-brand-1-500" label="500" />
                <ColorSwatch className="bg-brand-1-600" label="600" />
                <ColorSwatch className="bg-brand-1-700" label="700" />
                <ColorSwatch className="bg-brand-1-800" label="800" />
                <ColorSwatch className="bg-brand-1-900" label="900" />
                <ColorSwatch className="bg-brand-1-950" label="950" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Brand Color 2</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <ColorSwatch className="bg-brand-2-50" label="50" />
                <ColorSwatch className="bg-brand-2-100" label="100" />
                <ColorSwatch className="bg-brand-2-200" label="200" />
                <ColorSwatch className="bg-brand-2-300" label="300" />
                <ColorSwatch className="bg-brand-2-400" label="400" />
                <ColorSwatch className="bg-brand-2-500" label="500" />
                <ColorSwatch className="bg-brand-2-600" label="600" />
                <ColorSwatch className="bg-brand-2-700" label="700" />
                <ColorSwatch className="bg-brand-2-800" label="800" />
                <ColorSwatch className="bg-brand-2-900" label="900" />
                <ColorSwatch className="bg-brand-2-950" label="950" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Accent</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <ColorSwatch className="bg-accent-50" label="50" />
                <ColorSwatch className="bg-accent-100" label="100" />
                <ColorSwatch className="bg-accent-200" label="200" />
                <ColorSwatch className="bg-accent-300" label="300" />
                <ColorSwatch className="bg-accent-400" label="400" />
                <ColorSwatch className="bg-accent-500" label="500" />
                <ColorSwatch className="bg-accent-600" label="600" />
                <ColorSwatch className="bg-accent-700" label="700" />
                <ColorSwatch className="bg-accent-800" label="800" />
                <ColorSwatch className="bg-accent-900" label="900" />
                <ColorSwatch className="bg-accent-950" label="950" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">System Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch className="bg-background" label="Background" />
                <ColorSwatch className="bg-foreground" label="Foreground" />
                <ColorSwatch className="bg-primary" label="Primary" />
                <ColorSwatch className="bg-secondary" label="Secondary" />
                <ColorSwatch className="bg-muted" label="Muted" />
                <ColorSwatch className="bg-accent" label="Accent" />
                <ColorSwatch className="bg-card" label="Card" />
                <ColorSwatch className="bg-border" label="Border" />
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Spacing</h2>
          <div className="space-y-4">
            {[2, 4, 6, 8, 12, 16].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <div className={`bg-brand-1-500 h-8 w-${size}`} />
                <span className="text-sm text-muted-foreground">
                  {size * 0.25}rem ({size})
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="bg-brand-1-500 h-16 w-16 rounded-sm" />
              <p className="text-sm text-muted-foreground">Small</p>
            </div>
            <div className="space-y-2">
              <div className="bg-brand-1-500 h-16 w-16 rounded-md" />
              <p className="text-sm text-muted-foreground">Medium</p>
            </div>
            <div className="space-y-2">
              <div className="bg-brand-1-500 h-16 w-16 rounded-lg" />
              <p className="text-sm text-muted-foreground">Large</p>
            </div>
            <div className="space-y-2">
              <div className="bg-brand-1-500 h-16 w-16 rounded-full" />
              <p className="text-sm text-muted-foreground">Full</p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
