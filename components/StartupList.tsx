"use client";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { useEffect, useState } from "react";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default function StartupList({ query }: { query?: string }) {
  const [posts, setPosts] = useState<StartupTypeCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = { search: query || null };
      // Replace with your actual fetch logic
      const result = await client.fetch(STARTUPS_QUERY, params);
  setPosts((result as StartupTypeCard[]) || []);
      setLoading(false);
    };
    fetchData();
    // Optionally, refetch on window focus
    const onFocus = () => fetchData();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul className="mt-7 card_grid gap-8">
      {posts.length > 0 ? (
        posts.map((post) => (
          <StartupCard key={post?._id} post={post as StartupTypeCard} />
        ))
      ) : (
        <li>No posts found</li>
      )}
    </ul>
  );
}
