import { supabase } from "./lib/supabase";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function HomePage() {
  const { data: letters, error } = await supabase
    .from("letters")
    .select("*")
    .eq("category", "unspoken")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(25);

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p>Something went wrong loading the letters.</p>
      </main>
    );
  }

  const fonts = ["font-sans", "font-serif", "italic"];

  const sizes = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
  ];

  const opacities = [
    "opacity-35",
    "opacity-45",
    "opacity-55",
    "opacity-70",
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <header className="pt-16 pb-8 text-center px-6">
        <div className="flex justify-center">
          <img
            src="/title.png"
            alt="things you wanted to say but never did"
            className="w-[420px] md:w-[620px] max-w-full object-contain"
          />
        </div>

        <p className="mt-6 text-sm opacity-40">
          by Geloy Concepcion
        </p>

        <nav className="mt-10 flex justify-center gap-8 text-[11px] uppercase tracking-[0.3em]">
          <a href="/" className="underline underline-offset-8">
            Unspoken Words
          </a>

          <a
            href="/letters-to-geloy"
            className="opacity-50 hover:opacity-100 transition"
          >
            Letters to Geloy
          </a>

          <a
            href="/submit"
            className="opacity-50 hover:opacity-100 transition"
          >
            Submit
          </a>
        </nav>
      </header>

      {/* DESKTOP */}
      <section className="relative min-h-[7200px] hidden md:block">
        {letters?.map((letter, index) => {
          const row = Math.floor(index / 3);

          const top =
            row * 420 + randomBetween(120, 260);

          const left =
            (index % 3) * 30 + randomBetween(4, 18);

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

      {/* MOBILE */}
      <section className="md:hidden px-6 pb-32 space-y-24">
        {letters?.map((letter, index) => (
          <p
            key={letter.id}
            className={`
              leading-relaxed
              hover:opacity-100
              transition-opacity
              ${fonts[index % fonts.length]}
              ${sizes[index % sizes.length]}
              ${opacities[index % opacities.length]}
            `}
          >
            {letter.content}
          </p>
        ))}
      </section>
    </main>
  );
}