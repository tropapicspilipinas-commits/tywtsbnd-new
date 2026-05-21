import { supabase } from "./lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default async function LettersToGeloyPage() {
  const { data: allLetters, error } = await supabase
    .from("letters")
    .select("*")
    .eq("category", "geloy")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p>Something went wrong loading the letters.</p>
      </main>
    );
  }

  const letters = shuffleArray(allLetters || []).slice(0, 200);

  const fonts = ["font-sans", "font-serif", "italic"];
  const sizes = ["text-xs", "text-sm", "text-base", "text-lg"];
  const mobileSizes = ["text-[10px]", "text-[11px]", "text-xs"];
  const opacities = ["opacity-35", "opacity-45", "opacity-55", "opacity-70"];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <header className="pt-16 pb-8 text-center px-6">
        <h1 className="text-3xl md:text-5xl leading-tight font-light tracking-tight italic">
          Letters to Geloy
        </h1>

        <p className="mt-6 text-sm opacity-40">
          by Geloy Concepcion
        </p>

        <nav className="mt-10 flex justify-center gap-8 text-[11px] uppercase tracking-[0.3em]">
          <a
            href="/"
            className="opacity-40 hover:opacity-100 transition"
          >
            Unspoken Words
          </a>

          <a
            href="/letters-to-geloy"
            className="italic font-semibold opacity-100 no-underline"
          >
            Letters to Geloy
          </a>

          <a
            href="/submit"
            className="opacity-40 hover:opacity-100 transition"
          >
            Submit
          </a>
        </nav>
      </header>

      {/* DESKTOP */}
      <section className="relative min-h-[14000px] hidden md:block">
        {letters.map((letter, index) => {
          const row = Math.floor(index / 3);
          const top = row * 320 + randomBetween(120, 260);
          const left = (index % 3) * 30 + randomBetween(4, 18);

          return (
            <p
              key={letter.id}
              className={`
                absolute
                max-w-[260px]
                leading-relaxed
                hover:opacity-100
                hover:scale-105
                transition-all
                duration-500
                ${fonts[index % fonts.length]}
                ${sizes[index % sizes.length]}
                ${opacities[index % opacities.length]}
              `}
              style={{
                top: `${top}px`,
                left: `${left}%`,
              }}
            >
              {letter.content}
            </p>
          );
        })}
      </section>

      {/* MOBILE SAFE SCATTER */}
      <section className="md:hidden px-4 pb-32 pt-6">
        {letters.map((letter, index) => {
          const alignments = ["ml-0", "ml-auto", "mx-auto"];
          const widths = ["max-w-[150px]", "max-w-[190px]", "max-w-[230px]"];
          const margins = ["mb-20", "mb-28", "mb-36"];

          return (
            <p
              key={letter.id}
              className={`
                leading-relaxed
                transition-opacity
                hover:opacity-100
                ${fonts[index % fonts.length]}
                ${mobileSizes[index % mobileSizes.length]}
                ${opacities[index % opacities.length]}
                ${alignments[index % alignments.length]}
                ${widths[index % widths.length]}
                ${margins[index % margins.length]}
              `}
            >
              {letter.content}
            </p>
          );
        })}
      </section>
    </main>
  );
}