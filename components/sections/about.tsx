import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IoDownloadOutline,
  IoLogoGithub,
  IoPersonCircleOutline,
} from "react-icons/io5";
import Image from "next/image";

export function About() {
  return (
    <section className="relative flex justify-center z-10 bg-background/80 backdrop-blur-xl p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-end py-36">
        <div className="relative aspect-[3/4] w-80 min-w-80 rounded overflow-hidden">
          <Image
            src="/images/profile-img.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-end">
          <p className="mt-4 text-lg md:text-xl lg:text-2xl text-foreground indent-8 text-balance tracking-wide">
            Hi I&rsquo;m Travis, and I make things people use. In other words, I
            specialize in creating inclusive, human-centered digital
            experiences.{" "}
            <span className="text-muted-foreground">
              But something tells me you&rsquo;re not here to read a bunch of
              industry jargon, now are you?
            </span>
          </p>
          <div className="mt-4 flex flex-row flex-wrap">
            <Link href="/work">
              <Button variant="ghost">
                Check out my work <IoLogoGithub />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">
                Get to know me <IoPersonCircleOutline />
              </Button>
            </Link>
            <Link href="/Travis-Hall_CV.pdf" target="_blank" download>
              <Button variant="ghost">
                Download my CV <IoDownloadOutline />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
