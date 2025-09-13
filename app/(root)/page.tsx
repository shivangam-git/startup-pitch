import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}:{searchParams: {query?: string}}) {
  // console.log(searchParams);
    const query = (await searchParams).query;
    const params = { search: query || null };
    const session = await auth();
    console.log(session?.id);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
   <>
   <section className="pink_container">
   <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
         <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query}/>
   </section>
    <section className="section_container">
        <p className="text-30-semibold">
          {query ? (
            <>
              Search results for <span className="underline">{query}</span>
            </>
          ) : "All Startups"}
        </p>
        <ul className="mt-7 card_grid gap-8">
          {
            posts?.length >0?(
              posts.map((post:any) => (
               <StartupCard key={post?._id} post={post as StartupTypeCard} />
              ))
            ):(
              <li>No posts found</li>
            )
          }
        </ul>
      </section>
          <SanityLive />
   </>
  );
}
