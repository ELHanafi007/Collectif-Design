import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

type PolicySection = {
  title: string;
  body: string;
};

export default function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
}) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-40 md:pt-56 pb-16 px-6 md:px-12">
        <div className="container-wide max-w-4xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl tracking-tightest">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-sm md:text-base leading-8 text-muted font-light">
            {intro}
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="container-wide max-w-4xl border-t border-border">
          {sections.map((section) => (
            <article key={section.title} className="grid gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-10">
              <h2 className="md:col-span-4 text-lg md:text-xl tracking-tightest">
                {section.title}
              </h2>
              <p className="md:col-span-8 text-sm leading-8 text-muted font-light">
                {section.body}
              </p>
            </article>
          ))}

          <div className="pt-10">
            <Link href="/contact" className="btn-premium">
              <span>Nous contacter</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
