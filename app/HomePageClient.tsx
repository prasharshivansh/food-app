"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Meal {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

const HomePageClient = ({ meals }: { meals: Meal[] }) => {
  const [query, setQuery] = useState("");

  const filtered = meals.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="site-container">
      <header className="hero">
        <div className="hero-inner">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/favicon.ico" alt="logo" width={52} height={52} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 12, opacity: 0.95 }}>ORANGE FEAST</div>
                <div className="hero-title">Recipes & Culinary Adventures</div>
              </div>
            </div>
          </Link>

          <Image
            className="hero-heroimg"
            src="https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.jpg"
            alt="hero"
            width={420}
            height={320}
            style={{
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 10px 30px #0008",
              width: "100%",
              maxWidth: 420,
              height: 320,
              display: "block",
            }}
            priority
          />

          <div style={{ display: "flex", gap: 12 }}>
            <button className="discover-btn">
              <Link href="/meals">DISCOVER RECIPES</Link>
            </button>
          </div>

          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Find your next meal..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section style={{ marginTop: 12 }}>
        <h3 style={{ color: "#ffb23a", margin: "12px 0 10px", fontSize: 18 }}>
          Popular recipes
        </h3>
        <div className="recipe-grid">
          {filtered.map((r) => (
            <Link href={`/meals/${r.slug}`} key={r.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="recipe-card">
                <Image src={r.image} alt={r.title} className="thumb" width={300} height={200} style={{ objectFit: "cover" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="recipe--title">{r.title}</div>
                  <div className="recipe-meta">★ ★ ★ ★ ★</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePageClient;
