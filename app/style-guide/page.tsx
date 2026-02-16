"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/";

/* ------------------------------------------------------------------ */
/* Helpers                                                               */
/* ------------------------------------------------------------------ */

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="font-nohemi text-2xl font-bold shrink-0">{title}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      {children}
    </section>
  );
}

function ComponentExample({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="case-section-label">{title}</p>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function EasingCard({
  name,
  label,
  easing,
}: {
  name: string;
  label: string;
  easing: [number, number, number, number];
}) {
  const [playing, setPlaying] = useState(true);
  return (
    <div className="p-4 rounded-sm border border-border bg-card space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-[10px] text-muted-foreground font-mono">{name}</p>
        </div>
        <button
          onClick={() => setPlaying((v) => !v)}
          className="w-7 h-7 flex items-center justify-center rounded-sm border border-border bg-background hover:bg-secondary transition-colors"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>
      <div className="h-1 w-full bg-border rounded-full overflow-hidden">
        <AnimatePresence>
          {playing && (
            <motion.div
              key="bar"
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: easing, repeat: Infinity, repeatDelay: 0.6 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Swatch({ bg, label, sub }: { bg: string; label: string; sub?: string }) {
  return (
    <div className="space-y-1.5 min-w-0">
      <div
        className="h-10 w-full rounded-sm border border-black/5 dark:border-white/5"
        style={{ backgroundColor: bg }}
      />
      <p className="text-xs font-medium text-foreground leading-none">{label}</p>
      {sub && <p className="text-[10px] text-muted-foreground font-mono leading-none truncate">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Static palette data (no interpolated Tailwind classes)               */
/* ------------------------------------------------------------------ */

const brand1 = [
  { label: "50",  val: "oklch(0.99 0.010 195.9)" },
  { label: "100", val: "oklch(0.97 0.020 195.9)" },
  { label: "200", val: "oklch(0.92 0.040 195.9)" },
  { label: "300", val: "oklch(0.83 0.070 195.9)" },
  { label: "400", val: "oklch(0.69 0.100 195.9)" },
  { label: "500", val: "oklch(0.57 0.110 195.9)" },
  { label: "600", val: "oklch(0.48 0.090 195.9)" },
  { label: "700", val: "oklch(0.38 0.070 195.9)" },
  { label: "800", val: "oklch(0.29 0.050 195.9)" },
  { label: "900", val: "oklch(0.23 0.040 195.9)" },
  { label: "950", val: "oklch(0.18 0.030 195.9)" },
];

const brand2 = [
  { label: "50",  val: "oklch(0.99 0.010 80)" },
  { label: "100", val: "oklch(0.97 0.030 80)" },
  { label: "200", val: "oklch(0.93 0.065 80)" },
  { label: "300", val: "oklch(0.87 0.115 80)" },
  { label: "400", val: "oklch(0.79 0.160 80)" },
  { label: "500", val: "oklch(0.72 0.185 80)" },
  { label: "600", val: "oklch(0.60 0.160 80)" },
  { label: "700", val: "oklch(0.48 0.125 80)" },
  { label: "800", val: "oklch(0.36 0.090 80)" },
  { label: "900", val: "oklch(0.28 0.065 80)" },
  { label: "950", val: "oklch(0.21 0.045 80)" },
];

const brand3 = [
  { label: "50",  val: "oklch(0.99 0.005 127)" },
  { label: "100", val: "oklch(0.97 0.010 127)" },
  { label: "200", val: "oklch(0.92 0.015 127)" },
  { label: "300", val: "oklch(0.84 0.020 127)" },
  { label: "400", val: "oklch(0.71 0.030 127)" },
  { label: "500", val: "oklch(0.53 0.030 127)" },
  { label: "600", val: "oklch(0.44 0.025 127)" },
  { label: "700", val: "oklch(0.35 0.020 127)" },
  { label: "800", val: "oklch(0.27 0.015 127)" },
  { label: "900", val: "oklch(0.22 0.010 127)" },
  { label: "950", val: "oklch(0.17 0.010 127)" },
];

const semanticTokens = [
  { token: "--color-background",           label: "background" },
  { token: "--color-foreground",           label: "foreground" },
  { token: "--color-card",                 label: "card" },
  { token: "--color-card-foreground",      label: "card-foreground" },
  { token: "--color-popover",              label: "popover" },
  { token: "--color-popover-foreground",   label: "popover-foreground" },
  { token: "--color-primary",              label: "primary" },
  { token: "--color-primary-foreground",   label: "primary-foreground" },
  { token: "--color-secondary",            label: "secondary" },
  { token: "--color-secondary-foreground", label: "secondary-foreground" },
  { token: "--color-muted",                label: "muted" },
  { token: "--color-muted-foreground",     label: "muted-foreground" },
  { token: "--color-accent",               label: "accent" },
  { token: "--color-accent-foreground",    label: "accent-foreground" },
  { token: "--color-destructive",          label: "destructive" },
  { token: "--color-destructive-foreground", label: "destructive-fg" },
  { token: "--color-border",               label: "border" },
  { token: "--color-input",                label: "input" },
  { token: "--color-ring",                 label: "ring" },
];

const spacingSteps = [
  { rem: "0.25", cls: "w-1",  px: "4px"  },
  { rem: "0.5",  cls: "w-2",  px: "8px"  },
  { rem: "1",    cls: "w-4",  px: "16px" },
  { rem: "1.5",  cls: "w-6",  px: "24px" },
  { rem: "2",    cls: "w-8",  px: "32px" },
  { rem: "3",    cls: "w-12", px: "48px" },
  { rem: "4",    cls: "w-16", px: "64px" },
  { rem: "5",    cls: "w-20", px: "80px" },
  { rem: "6",    cls: "w-24", px: "96px" },
];

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */

export default function StyleGuide() {
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-8 pt-32 pb-24 space-y-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="about-heading">Style Guide</h1>
        <p className="text-muted-foreground max-w-md">
          Design tokens, typography, components, and custom CSS class documentation.
        </p>
      </motion.div>

      {/* ── Typography ──────────────────────────────────────────────── */}
      <Section id="typography" title="Typography">
        <div className="space-y-10">

          <div className="space-y-4">
            <p className="case-section-label">Nohemi — Display</p>
            <p className="font-nohemi text-7xl font-black leading-none">Aa</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2">
              <p className="font-nohemi text-5xl font-bold">Display Bold</p>
              <p className="font-nohemi text-4xl font-semibold">Display Semibold</p>
              <p className="font-nohemi text-3xl font-medium">Display Medium</p>
              <p className="font-nohemi text-2xl font-light">Display Light</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="case-section-label">Manrope — Body</p>
            <div className="max-w-2xl space-y-3">
              <p className="text-xl">Large — The quick brown fox jumps over the lazy dog.</p>
              <p className="text-base">Base — The quick brown fox jumps over the lazy dog.</p>
              <p className="text-sm">Small — The quick brown fox jumps over the lazy dog.</p>
              <p className="text-xs text-muted-foreground">XS / muted — The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="case-section-label">Custom typography classes</p>
            <div className="space-y-6 p-6 rounded-sm border border-border bg-card">
              <div><p className="case-section-label mb-2">.hero-label</p>
                <p className="hero-label text-muted-foreground">Selected work · 2024</p></div>
              <div><p className="case-section-label mb-2">.hero-heading</p>
                <p className="hero-heading">Designing systems that scale.</p></div>
              <div><p className="case-section-label mb-2">.about-heading</p>
                <p className="about-heading">About</p></div>
              <div><p className="case-section-label mb-2">.about-subheading</p>
                <p className="about-subheading">Designer & developer</p></div>
              <div><p className="case-section-label mb-2">.case-hero-heading</p>
                <p className="case-hero-heading">Case Study</p></div>
              <div><p className="case-section-label mb-2">.case-section-label</p>
                <p className="case-section-label">Section label</p></div>
            </div>
          </div>

        </div>
      </Section>

      {/* ── Color Palette ────────────────────────────────────────────── */}
      <Section id="colors" title="Color Palette">
        <div className="space-y-8">

          <div className="space-y-3">
            <p className="case-section-label">Brand 1 — Blue-teal (h195)</p>
            <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
              {brand1.map((s) => <Swatch key={s.label} bg={s.val} label={s.label} sub={s.val} />)}
            </div>
          </div>

          <div className="space-y-3">
            <p className="case-section-label">Brand 2 — Amber (h80)</p>
            <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
              {brand2.map((s) => <Swatch key={s.label} bg={s.val} label={s.label} sub={s.val} />)}
            </div>
          </div>

          <div className="space-y-3">
            <p className="case-section-label">Brand 3 — Sage/Neutral (h127)</p>
            <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
              {brand3.map((s) => <Swatch key={s.label} bg={s.val} label={s.label} sub={s.val} />)}
            </div>
          </div>

        </div>
      </Section>

      {/* ── Semantic Tokens ──────────────────────────────────────────── */}
      <Section id="tokens" title="Semantic Tokens">
        <p className="text-sm text-muted-foreground -mt-4">
          These resolve differently per mode — use the theme toggle in the nav to verify.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {semanticTokens.map(({ token, label }) => (
            <Swatch key={token} bg={`var(${token})`} label={label} sub={token} />
          ))}
        </div>
      </Section>

      {/* ── Custom Component Classes ─────────────────────────────────── */}
      <Section id="custom-components" title="Custom Component Classes">
        <div className="space-y-10">

          <ComponentExample title=".nav-trigger / .nav-menu">
            <button className="nav-trigger px-4 py-2 rounded-sm text-sm font-medium">
              Nav Trigger
            </button>
            <div className="nav-menu px-4 py-2 rounded-sm text-sm">
              Nav Menu Surface
            </div>
          </ComponentExample>

          <ComponentExample title=".card-case-study + .card-badge + .card-image">
            <div className="card-case-study relative w-64 h-48 group cursor-pointer">
              <div
                className="card-image absolute inset-0"
                style={{ background: "linear-gradient(135deg, var(--color-brand-1-400), var(--color-brand-1-700))" }}
              />
              <div className="absolute top-3 left-3">
                <span className="card-badge">Featured</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-medium text-foreground relative z-10">Hover to reveal</p>
              </div>
            </div>
          </ComponentExample>

          <ComponentExample title=".case-tag">
            <span className="case-tag">Product Design</span>
            <span className="case-tag">Design Systems</span>
            <span className="case-tag">Research</span>
          </ComponentExample>

          <ComponentExample title=".skill-badge">
            <span className="skill-badge">Figma</span>
            <span className="skill-badge">React</span>
            <span className="skill-badge">TypeScript</span>
            <span className="skill-badge">Tailwind CSS</span>
          </ComponentExample>

          <ComponentExample title=".case-preview-card">
            <div className="case-preview-card w-72 space-y-2">
              <p className="case-section-label">Preview</p>
              <p className="text-sm text-muted-foreground">
                Frosted glass card surface used in case study detail pages.
              </p>
            </div>
          </ComponentExample>

          <ComponentExample title=".section-container">
            <div className="w-full border border-dashed border-border rounded-sm">
              <div className="section-container">
                <p className="text-sm text-muted-foreground">
                  max-w-7xl · px-4 xl:px-8 · py-12 md:py-16
                </p>
              </div>
            </div>
          </ComponentExample>

        </div>
      </Section>

      {/* ── Motion ───────────────────────────────────────────────────── */}
      <Section id="motion" title="Motion">
        <div className="space-y-6">

          <div className="space-y-4">
            <p className="case-section-label">Easing curves</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "--ease-expo",   label: "Expo",   easing: [0.16, 1, 0.30, 1]      as [number,number,number,number] },
                { name: "--ease-quart",  label: "Quart",  easing: [0.04, 0.62, 0.23, 0.98] as [number,number,number,number] },
                { name: "--ease-in-out", label: "In-Out", easing: [0.4, 0, 0.2, 1]         as [number,number,number,number] },
              ].map(({ name, label, easing }) => (
                <EasingCard key={name} name={name} label={label} easing={easing} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="case-section-label">Duration tokens</p>
            <div className="flex flex-wrap gap-3">
              {[
                { token: "--duration-fast", label: "Fast", ms: "200ms" },
                { token: "--duration-base", label: "Base", ms: "400ms" },
                { token: "--duration-slow", label: "Slow", ms: "600ms" },
              ].map(({ token, label, ms }) => (
                <div key={token} className="px-4 py-3 rounded-sm border border-border bg-card space-y-1 min-w-[120px]">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{token}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--color-accent)" }}>{ms}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ── Border Radius ────────────────────────────────────────────── */}
      <Section id="radius" title="Border Radius">
        <div className="flex flex-wrap items-end gap-8">
          <div className="space-y-2 text-center">
            <div className="bg-primary h-14 w-14 rounded-none" />
            <p className="text-xs text-muted-foreground font-mono">none</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="bg-primary h-14 w-14 rounded-sm" />
            <p className="text-xs text-muted-foreground font-mono">sm</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="bg-primary h-14 w-14 rounded-md" />
            <p className="text-xs text-muted-foreground font-mono">md</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="bg-primary h-14 w-14 rounded-lg" />
            <p className="text-xs text-muted-foreground font-mono">lg</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="bg-primary h-14 w-14 rounded-xl" />
            <p className="text-xs text-muted-foreground font-mono">xl</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="bg-primary h-14 w-14 rounded-full" />
            <p className="text-xs text-muted-foreground font-mono">full</p>
          </div>
        </div>
      </Section>

      {/* ── Spacing ──────────────────────────────────────────────────── */}
      <Section id="spacing" title="Spacing Scale">
        <div className="space-y-3">
          {spacingSteps.map(({ rem, cls, px }) => (
            <div key={cls} className="flex items-center gap-4">
              <div
                className="bg-primary h-5 rounded-sm shrink-0"
                style={{ width: px }}
              />
              <span className="text-xs text-muted-foreground font-mono">
                {rem}rem · {cls} · {px}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── UI Components ────────────────────────────────────────────── */}
      <Section id="components" title="UI Components">
        <div className="space-y-10">

          <ComponentExample title="Button — variants">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </ComponentExample>

          <ComponentExample title="Button — sizes">
            <Button size="sm" variant="default">Small</Button>
            <Button size="default" variant="default">Default</Button>
            <Button size="lg" variant="default">Large</Button>
          </ComponentExample>

          <ComponentExample title="Card">
            <Card className="w-72">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Supporting description text.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Card content goes here.</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Save</Button>
                <Button size="sm" variant="ghost">Cancel</Button>
              </CardFooter>
            </Card>
          </ComponentExample>

          <ComponentExample title="Input + Label">
            <div className="w-72 space-y-2">
              <Label htmlFor="demo-input">Email address</Label>
              <Input id="demo-input" type="email" placeholder="you@example.com" />
            </div>
          </ComponentExample>

          <ComponentExample title="Progress">
            <div className="w-72 space-y-3">
              <Progress value={25} />
              <Progress value={60} />
              <Progress value={90} />
            </div>
          </ComponentExample>

          <ComponentExample title="Skeleton">
            <div className="w-64 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </ComponentExample>

          <ComponentExample title="Toggle + Toggle Group">
            <Toggle>Bold</Toggle>
            <Toggle>Italic</Toggle>
            <Toggle defaultPressed>Underline</Toggle>
            <div className="w-px h-6 bg-border" />
            <ToggleGroup type="single" defaultValue="2">
              <ToggleGroupItem value="1">Day</ToggleGroupItem>
              <ToggleGroupItem value="2">Week</ToggleGroupItem>
              <ToggleGroupItem value="3">Month</ToggleGroupItem>
            </ToggleGroup>
          </ComponentExample>

          <ComponentExample title="Dropdown Menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentExample>

          <ComponentExample title="Popover">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm">Popover content with theme applied.</p>
              </PopoverContent>
            </Popover>
          </ComponentExample>

          <ComponentExample title="Sheet">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>Sheet description text.</SheetDescription>
                </SheetHeader>
                <div className="py-4 text-sm text-muted-foreground">Sheet body content.</div>
                <SheetFooter>
                  <Button>Save Changes</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </ComponentExample>

          <ComponentExample title="Drawer">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer Title</DrawerTitle>
                  <DrawerDescription>Drawer description text.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 text-sm text-muted-foreground">Drawer body content.</div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button>Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </ComponentExample>

          <ComponentExample title="Pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentExample>

        </div>
      </Section>

    </div>
  );
}
