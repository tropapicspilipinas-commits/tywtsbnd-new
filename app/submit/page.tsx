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
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-10">SUBMIT</h1>

      <div className="space-y-16 max-w-3xl">
        <section>
          <h2 className="text-2xl mb-4">Unspoken Words</h2>

          <textarea
            value={unspoken}
            onChange={(e) => setUnspoken(e.target.value)}
            className="w-full h-40 bg-black border border-white p-4 text-white"
            placeholder="What is something you wanted to say but never did?"
          />

          <button
            onClick={submitUnspoken}
            className="mt-4 border border-white px-6 py-3 hover:bg-white hover:text-black transition"
          >
            Submit anonymously
          </button>
        </section>

        <section>
          <h2 className="text-2xl mb-4">Letter to Geloy</h2>

          <textarea
            value={geloyLetter}
            onChange={(e) => setGeloyLetter(e.target.value)}
            className="w-full h-40 bg-black border border-white p-4 text-white"
            placeholder="Write a letter to Geloy..."
          />

          <button
            onClick={submitGeloyLetter}
            className="mt-4 border border-white px-6 py-3 hover:bg-white hover:text-black transition"
          >
            Send letter
          </button>
        </section>
      </div>
    </main>
  );
}