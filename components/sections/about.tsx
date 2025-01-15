import Link from "next/link";

export function About() {
  return (
    <section className="relative z-10 bg-background/80 backdrop-blur-xl p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-nohemi text-3xl sm:text-4xl font-bold mb-8">
          About
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground">
            A designer and developer focused on creating thoughtful digital
            experiences. With expertise in both design and development, I bring
            a unique perspective
          </p>
          <p className="text-muted-foreground mt-4">
            <Link
              href="/work"
              className="text-primary hover:text-primary/80 no-underline"
            >
              Learn more about my work →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
