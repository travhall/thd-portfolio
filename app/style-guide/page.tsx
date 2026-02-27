"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPause,
  FiPlay,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
  FiDownload,
  FiRefreshCw,
  FiX,
  FiCheck,
  FiMoon,
  FiSun,
  FiMonitor,
  FiCircle,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCopy,
  FiSend,
} from "react-icons/fi";
import {
  Badge,
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy easing token: ", err);
    }
  };

  return (
    <div className="p-4 rounded-sm border border-border bg-card space-y-3 relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <button
          onClick={handleCopy}
          className="text-left outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-xs"
          title={`Click to copy ${name}`}
        >
          <p className="text-sm font-medium group-hover:text-primary transition-colors">
            {copied ? "Copied!" : label}
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">{name}</p>
        </button>
        <button
          onClick={() => setPlaying((v) => !v)}
          className="w-7 h-7 flex items-center justify-center rounded-sm border border-border bg-background hover:bg-secondary transition-colors"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <FiPause className="w-3 h-3" /> : <FiPlay className="w-3 h-3" />}
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!sub) return;
    try {
      await navigator.clipboard.writeText(sub);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy color token: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col text-left space-y-1.5 min-w-0 outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm"
      title={sub ? `Click to copy ${sub}` : undefined}
    >
      <div
        className="h-10 w-full rounded-sm border border-black/5 dark:border-white/5 transition-transform group-hover:scale-[1.04] group-active:scale-[0.98]"
        style={{ backgroundColor: bg }}
      >
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 dark:bg-white/20 backdrop-blur-[2px] rounded-sm"
            >
              <FiCheck className="w-4 h-4 text-white dark:text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-xs font-medium text-foreground leading-none">{copied ? "Copied!" : label}</p>
      {sub && (
        <p className="text-[10px] text-muted-foreground font-mono leading-none truncate w-full group-hover:text-primary transition-colors">
          {sub}
        </p>
      )}
    </button>
  );
}

function IconCard({ icon: Icon, name }: { icon: React.ElementType; name: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy icon name: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative flex flex-col items-center justify-center p-4 rounded-sm border border-border bg-card gap-3 hover:bg-secondary/50 transition-colors cursor-pointer group w-full outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
      title={`Click to copy ${name}`}
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FiCheck className="w-5 h-5 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-[10px] text-muted-foreground font-mono leading-none text-center truncate w-full group-hover:text-foreground transition-colors">
        {copied ? "Copied!" : name}
      </p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Palette config — single source of truth is globals.css @theme.      */
/* Swatches reference CSS vars directly; no value duplication here.    */
/* ------------------------------------------------------------------ */

const SCALE_STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

const palettes = [
  { key: "brand-1", label: "Brand 1 — Blue-teal (h195)" },
  { key: "brand-2", label: "Brand 2 — Amber (h80)" },
  { key: "brand-3", label: "Brand 3 — Sage/Neutral (h127)" },
] as const;

/**
 * Reads all semantic color tokens directly from the parsed stylesheet.
 * Any --color-* property that isn't a palette token (--color-brand-*)
 * is considered semantic. Order follows declaration order in globals.css.
 * Adding or removing a token there is automatically reflected here.
 */
function useSemanticTokens() {
  const [tokens, setTokens] = useState<{ token: string; label: string }[]>([]);

  useEffect(() => {
    const seen = new Set<string>();
    const result: { token: string; label: string }[] = [];

    // Walk a rule list, including nested @layer / @media blocks recursively
    function walkRules(rules: CSSRuleList) {
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule) {
          for (const prop of Array.from(rule.style)) {
            if (
              prop.startsWith("--color-") &&
              !prop.startsWith("--color-brand-") &&
              !seen.has(prop)
            ) {
              seen.add(prop);
              result.push({ token: prop, label: prop.replace(/^--color-/, "") });
            }
          }
        }
        // Recurse into @layer, @media, @supports, etc.
        const nested = (rule as CSSGroupingRule).cssRules;
        if (nested) walkRules(nested);
      }
    }

    for (const sheet of Array.from(document.styleSheets)) {
      try {
        walkRules(sheet.cssRules);
      } catch {
        // Cross-origin sheet — skip
      }
    }

    setTokens(result);
  }, []);

  return tokens;
}

const spacingSteps = [
  { rem: "0.25", cls: "w-1", px: "4px" },
  { rem: "0.5", cls: "w-2", px: "8px" },
  { rem: "1", cls: "w-4", px: "16px" },
  { rem: "1.5", cls: "w-6", px: "24px" },
  { rem: "2", cls: "w-8", px: "32px" },
  { rem: "3", cls: "w-12", px: "48px" },
  { rem: "4", cls: "w-16", px: "64px" },
  { rem: "5", cls: "w-20", px: "80px" },
  { rem: "6", cls: "w-24", px: "96px" },
];

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */

export default function StyleGuide() {
  const semanticTokens = useSemanticTokens();

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

        </div>
      </Section>

      {/* ── Color Palette ────────────────────────────────────────────── */}
      <Section id="colors" title="Color Palette">
        <div className="space-y-8">
          {palettes.map(({ key, label }) => (
            <div key={key} className="space-y-3">
              <p className="case-section-label">{label}</p>
              <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                {SCALE_STEPS.map((step) => {
                  const token = `--color-${key}-${step}`;
                  return (
                    <Swatch
                      key={step}
                      bg={`var(${token})`}
                      label={step}
                      sub={token}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Semantic Tokens ──────────────────────────────────────────── */}
      <Section id="tokens" title="Semantic Tokens">
        <p className="text-sm text-muted-foreground -mt-4">
          These resolve differently per mode — use the theme toggle in the nav to verify.
          Tokens are read live from the stylesheet; adding a <code className="text-xs font-mono">--color-*</code> property
          to <code className="text-xs font-mono">globals.css</code> will appear here automatically.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {semanticTokens.length === 0
            ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-10 w-full rounded-sm" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))
            : semanticTokens.map(({ token, label }) => (
              <Swatch key={token} bg={`var(${token})`} label={label} sub={token} />
            ))
          }
        </div>
      </Section>

      {/* ── Motion ───────────────────────────────────────────────────── */}
      <Section id="motion" title="Motion">
        <div className="space-y-6">

          <div className="space-y-4">
            <p className="case-section-label">Easing curves</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "--ease-expo", label: "Expo", easing: [0.16, 1, 0.30, 1] as [number, number, number, number] },
                { name: "--ease-quart", label: "Quart", easing: [0.04, 0.62, 0.23, 0.98] as [number, number, number, number] },
                { name: "--ease-in-out", label: "In-Out", easing: [0.4, 0, 0.2, 1] as [number, number, number, number] },
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
              ].map(({ token, label, ms }) => {
                // Inline copy state for simple cards
                return (
                  <button
                    key={token}
                    onClick={() => navigator.clipboard.writeText(token)}
                    className="px-4 py-3 rounded-sm border border-border bg-card space-y-1 min-w-[120px] text-left hover:bg-secondary transition-colors group outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                    title={`Click to copy ${token}`}
                  >
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{label}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{token}</p>
                    <p className="text-xs font-mono" style={{ color: "var(--color-accent)" }}>{ms}</p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </Section>

      {/* ── Border Radius ────────────────────────────────────────────── */}
      <Section id="radius" title="Border Radius">
        <div className="flex flex-wrap items-end gap-8">
          {[
            { label: "none", cls: "rounded-none" },
            { label: "sm", cls: "rounded-sm" },
            { label: "md", cls: "rounded-md" },
            { label: "lg", cls: "rounded-lg" },
            { label: "xl", cls: "rounded-xl" },
            { label: "full", cls: "rounded-full" },
          ].map(({ label, cls }) => (
            <button
              key={label}
              onClick={() => navigator.clipboard.writeText(cls)}
              className="space-y-2 text-center group outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm p-1"
              title={`Click to copy ${cls}`}
            >
              <div className={`bg-primary h-14 w-14 ${cls} transition-transform group-hover:scale-110 group-active:scale-95`} />
              <p className="text-xs text-muted-foreground font-mono group-hover:text-primary transition-colors">{label}</p>
            </button>
          ))}
        </div>
      </Section>

      {/* ── Spacing ──────────────────────────────────────────────────── */}
      <Section id="spacing" title="Spacing Scale">
        <div className="space-y-3">
          {spacingSteps.map(({ rem, cls, px }) => (
            <button
              key={cls}
              onClick={() => navigator.clipboard.writeText(cls)}
              className="flex items-center gap-4 w-full text-left group outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-xs"
              title={`Click to copy ${cls}`}
            >
              <div
                className="bg-primary h-5 rounded-xs shrink-0 transition-transform group-hover:scale-x-105 origin-left"
                style={{ width: px }}
              />
              <span className="text-xs text-muted-foreground font-mono group-hover:text-primary transition-colors">
                {rem}rem · {cls} · {px}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* ── Icons ────────────────────────────────────────────────────── */}
      <Section id="icons" title="Icons">
        <p className="text-sm text-muted-foreground -mt-4">
          The site uses the Feather icon set via <code className="text-xs font-mono">react-icons/fi</code>.
          Below are the icons currently in use across the portfolio.
        </p>

        <div className="space-y-10">
          <div className="space-y-4">
            <p className="case-section-label">Navigation & Direction</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              <IconCard icon={FiArrowLeft} name="FiArrowLeft" />
              <IconCard icon={FiArrowRight} name="FiArrowRight" />
              <IconCard icon={FiArrowUpRight} name="FiArrowUpRight" />
              <IconCard icon={FiChevronLeft} name="FiChevronLeft" />
              <IconCard icon={FiChevronRight} name="FiChevronRight" />
              <IconCard icon={FiMoreHorizontal} name="FiMoreHorizontal" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="case-section-label">Actions & State</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              <IconCard icon={FiDownload} name="FiDownload" />
              <IconCard icon={FiRefreshCw} name="FiRefreshCw" />
              <IconCard icon={FiCheck} name="FiCheck" />
              <IconCard icon={FiX} name="FiX" />
              <IconCard icon={FiCircle} name="FiCircle" />
              <IconCard icon={FiPause} name="FiPause" />
              <IconCard icon={FiPlay} name="FiPlay" />
              <IconCard icon={FiCopy} name="FiCopy" />
              <IconCard icon={FiSend} name="FiSend" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="case-section-label">Social & Theme</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              <IconCard icon={FiGithub} name="FiGithub" />
              <IconCard icon={FiLinkedin} name="FiLinkedin" />
              <IconCard icon={FiMail} name="FiMail" />
              <IconCard icon={FiSun} name="FiSun" />
              <IconCard icon={FiMoon} name="FiMoon" />
              <IconCard icon={FiMonitor} name="FiMonitor" />
            </div>
          </div>
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

          <ComponentExample title="Badge Default">
            <Badge>New Project</Badge>
            <Badge>Coming Soon</Badge>
            <Badge>Archived</Badge>
          </ComponentExample>

          <ComponentExample title="Badge Secondary">
            <Badge variant="secondary">Product Design</Badge>
            <Badge variant="secondary">Design Systems</Badge>
            <Badge variant="secondary">Research</Badge>
          </ComponentExample>

          <ComponentExample title="Badge Outline">
            <Badge variant="outline">Figma</Badge>
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
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
              <Progress value={25} aria-label="25% complete" />
              <Progress value={60} aria-label="60% complete" />
              <Progress value={90} aria-label="90% complete" />
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
