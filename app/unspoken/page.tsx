import { supabase } from "../lib/supabase";

export default async function UnspokenPage() {
  const { data: letters, error } = await supabase
    .from("letters")
    .select("*")
    .eq("category", "unspoken")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl mb-10">UNSPOKEN WORDS</h1>
       <p>Something went wrong loading the letters.</p>
<pre className="mt-6 whitespace-pre-wrap text-sm">
  {error.message}
</pre>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-10">UNSPOKEN WORDS</h1>

      <div className="space-y-8 max-w-3xl">
        {letters?.map((letter) => (
          <p key={letter.id}>{letter.content}</p>
        ))}
      </div>
    </main>
  );
}