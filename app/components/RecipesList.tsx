"use client";

import Image from "next/image";
import Link from "next/link";

// This interface should match the one in HomePageClient.tsx
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

const RecipesList = ({ meals }: { meals: Meal[] }) => {
  return (
    <section style={{ marginTop: 40 }}>
      {/* This wrapper enforces the 920px width matching the header */}
      <div className="section-inner">
        <h3 className="section-title">Popular recipes</h3>

        <div className="recipe-grid">
          {meals.map((r) => (
            <Link
              href={`/meals/${r.slug}`}
              key={r.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article className="recipe-card">
                <div className="recipe-image-wrapper">
                  <Image
                    src={r.image}
                    alt={r.title}
                    className="thumb"
                    width={400}
                    height={300}
                    priority={false}
                  />
                </div>

                <div className="recipe-content">
                  <div className="recipe-title">{r.title}</div>
                  <div className="recipe-meta">★ ★ ★ ★ ★</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesList;
