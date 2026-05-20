"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SubmitPage() {
  const [unspoken, setUnspoken] = useState("");
  const [geloyLetter, setGeloyLetter] = useState("");

  async function submitUnspoken() {
    if (!unspoken) return;

    const { error } = await supabase.from("letters").insert({
      category: "unspoken",
      content: unspoken,
    });

    if (error) {
      alert("Something went wrong.");
      return;
    }

    alert("Submitted.");
    setUnspoken("");
  }

  async function submitGeloyLetter() {
    if (!geloyLetter) return;

    const { error } = await supabase.from("letters").insert({
      category: "geloy",
      content: geloyLetter,
    });

    if (error) {
      alert("Something went wrong.");
      return;
    }

    alert("Submitted.");
    setGeloyLetter("");
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <header className="text-center mb-20">
        <h1 className="text-3xl md:text-5xl leading-tight font-light tracking-tight">
          submit
        </h1>

        <p className="mt-4 text-sm opacity-40">
          anonymously or otherwise
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
            className="opacity-40 hover:opacity-100 transition"
          >
            Letters to Geloy
          </a>

          <a
            href="/submit"
            className="italic opacity-100"
          >
            Submit
          </a>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto space-y-24">
        {/* UNSPOKEN */}
        <section>
          <h2 className="text-xl mb-6 opacity-80">
            Unspoken Words
          </h2>

          <textarea
            value={unspoken}
            onChange={(e) => setUnspoken(e.target.value)}
            className="
              w-full
              min-h-[220px]
              bg-transparent
              border border-white/20
              p-6
              text-white
              placeholder-white/30
              focus:outline-none
              focus:border-white/50
              transition
              resize-none
            "
            placeholder="What is something you wanted to say but never did?"
          />

          <button
            onClick={submitUnspoken}
            className="
              mt-6
              text-sm
              uppercase
              tracking-[0.25em]
              opacity-60
              hover:opacity-100
              transition
            "
          >
            Submit anonymously
          </button>
        </section>

        {/* LETTERS TO GELOY */}
        <section>
          <h2 className="text-xl mb-6 opacity-80">
            Letters to Geloy
          </h2>

          <textarea
            value={geloyLetter}
            onChange={(e) => setGeloyLetter(e.target.value)}
            className="
              w-full
              min-h-[260px]
              bg-transparent
              border border-white/20
              p-6
              text-white
              placeholder-white/30
              focus:outline-none
              focus:border-white/50
              transition
              resize-none
            "
            placeholder="How does this project affect you? Any suggestions or recommendations for this project? Anything you want to say to Geloy. And if you can, tell him where you're writing from :)"
          />

          <button
            onClick={submitGeloyLetter}
            className="
              mt-6
              text-sm
              uppercase
              tracking-[0.25em]
              opacity-60
              hover:opacity-100
              transition
            "
          >
            Send letter
          </button>
        </section>
      </div>
    </main>
  );
}