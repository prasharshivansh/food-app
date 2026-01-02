"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const HomePageClient = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(window.location.search);
    if (e.target.value) {
      params.set('q', e.target.value);
    } else {
      params.delete('q');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

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
              defaultValue={searchParams.get('q') ?? ''}
              onChange={handleSearch}
            />
          </div>
        </div>
      </header>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

export default HomePageClient;
