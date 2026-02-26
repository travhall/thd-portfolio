import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-start justify-center p-4 xl:p-8 max-w-8xl mx-auto">
      <p className="hero-label mb-6">404</p>
      <h1 className="about-heading mb-4">Page not found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-[48ch]">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Button asChild variant="default" size="lg" className="group">
        <Link href="/">
          <FiArrowLeft
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
