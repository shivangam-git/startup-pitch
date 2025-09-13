import Form from "next/form"
import SearchFormReset from "./SeachFormReset";
import { Search } from "lucide-react";
export default function SearchForm({query}:{query?: string}) {
    return (
        <Form action="/" className="search-form">
            <input className="search-input" placeholder="Search Startups..." defaultValue={query} name="query" />
             <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button type="submit" className="search-btn text-white">
                    <Search className="size-5" />
                </button>
            </div>
        </Form>
    );
}


// Why  code works without onChange

// You used defaultValue (not value), so the input is uncontrolled.

// This means the browser manages typing just like a plain HTML form field.

// When the form is submitted, the input’s value gets included automatically (thanks to name="query").

// Typing → browser updates input box.

// Submit (Enter/Click) → browser turns form fields into ?query=....

// Next.js → gives you searchParams.query.