"use client";

import React from "react";
import { motion } from "framer-motion";
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

interface ComponentExampleProps {
  title: string;
  children: React.ReactNode;
}

function ComponentExample({ title, children }: ComponentExampleProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  );
}

interface ColorSwatchProps {
  className: string;
  label: string;
}

function ColorSwatch({ className, label }: ColorSwatchProps) {
  return (
    <div className="space-y-2">
      <div className={`h-16 w-full rounded-sm ${className}`} />
      <p className="text-sm text-muted-foreground mb-4">{label}</p>
    </div>
  );
}

export default function StyleGuide() {
  return (
    <div className="max-w-7xl mx-auto p-4 xl:p-8">
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
          <div className="space-y-8">
            {/* Brand Color 1 */}
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

            {/* Brand Color 2 */}
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

            {/* Accent Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Brand Color 3</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <ColorSwatch className="bg-brand-3-50" label="50" />
                <ColorSwatch className="bg-brand-3-100" label="100" />
                <ColorSwatch className="bg-brand-3-200" label="200" />
                <ColorSwatch className="bg-brand-3-300" label="300" />
                <ColorSwatch className="bg-brand-3-400" label="400" />
                <ColorSwatch className="bg-brand-3-500" label="500" />
                <ColorSwatch className="bg-brand-3-600" label="600" />
                <ColorSwatch className="bg-brand-3-700" label="700" />
                <ColorSwatch className="bg-brand-3-800" label="800" />
                <ColorSwatch className="bg-brand-3-900" label="900" />
                <ColorSwatch className="bg-brand-3-950" label="950" />
              </div>
            </div>

            {/* System Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">System Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch className="bg-background" label="Background" />
                <ColorSwatch className="bg-foreground" label="Foreground" />
                <ColorSwatch className="bg-primary" label="Primary" />
                <ColorSwatch
                  className="bg-primary-foreground"
                  label="Primary Foreground"
                />
                <ColorSwatch className="bg-secondary" label="Secondary" />
                <ColorSwatch
                  className="bg-secondary-foreground"
                  label="Secondary Foreground"
                />
                <ColorSwatch className="bg-muted" label="Muted" />
                <ColorSwatch
                  className="bg-muted-foreground"
                  label="Muted Foreground"
                />
                <ColorSwatch className="bg-accent" label="Accent" />
                <ColorSwatch
                  className="bg-accent-foreground"
                  label="Accent Foreground"
                />
                <ColorSwatch className="bg-destructive" label="Destructive" />
                <ColorSwatch
                  className="bg-destructive-foreground"
                  label="Destructive Foreground"
                />
                <ColorSwatch className="bg-card" label="Card" />
                <ColorSwatch
                  className="bg-card-foreground"
                  label="Card Foreground"
                />
                <ColorSwatch className="bg-popover" label="Popover" />
                <ColorSwatch
                  className="bg-popover-foreground"
                  label="Popover Foreground"
                />
                <ColorSwatch className="bg-border" label="Border" />
                <ColorSwatch className="bg-input" label="Input" />
                <ColorSwatch className="bg-ring" label="Ring" />
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

        {/* Components */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Components</h2>
          <div className="space-y-8">
            {/* Button */}
            <ComponentExample title="Button">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </ComponentExample>
            <ComponentExample title="Button">
              <Button size="lg" variant="default">
                Default
              </Button>
              <Button size="lg" variant="secondary">
                Secondary
              </Button>
              <Button size="lg" variant="destructive">
                Destructive
              </Button>
              <Button size="lg" variant="outline">
                Outline
              </Button>
              <Button size="lg" variant="ghost">
                Ghost
              </Button>
              <Button size="lg" variant="link">
                Link
              </Button>
            </ComponentExample>

            {/* Card */}
            <ComponentExample title="Card">
              <Card className="w-72">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </ComponentExample>

            {/* Input */}
            <ComponentExample title="Input">
              <div className="w-72">
                <Label>Label</Label>
                <Input placeholder="Enter text..." />
              </div>
            </ComponentExample>

            {/* Dropdown Menu */}
            <ComponentExample title="Dropdown Menu">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentExample>

            {/* Sheet */}
            <ComponentExample title="Sheet">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>Sheet Description</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">Sheet Content</div>
                  <SheetFooter>
                    <Button>Save Changes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </ComponentExample>

            {/* Drawer */}
            <ComponentExample title="Drawer">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer Title</DrawerTitle>
                    <DrawerDescription>Drawer Description</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">Drawer Content</div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button>Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </ComponentExample>

            {/* Popover */}
            <ComponentExample title="Popover">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-4">Popover Content</div>
                </PopoverContent>
              </Popover>
            </ComponentExample>

            {/* Progress */}
            <ComponentExample title="Progress">
              <Progress value={50} className="w-72" />
            </ComponentExample>

            {/* Pagination */}
            <ComponentExample title="Pagination">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </ComponentExample>

            {/* Skeleton */}
            <ComponentExample title="Skeleton">
              <Skeleton className="w-72 h-24" />
            </ComponentExample>

            {/* Toggle */}
            <ComponentExample title="Toggle">
              <Toggle>Toggle Me</Toggle>
            </ComponentExample>

            {/* Toggle Group */}
            <ComponentExample title="Toggle Group">
              <ToggleGroup type="single">
                <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
                <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
                <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
              </ToggleGroup>
            </ComponentExample>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
