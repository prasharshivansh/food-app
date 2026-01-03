"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../components/Navbar.css";

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

const MealsPageClient = ({ meals }: { meals: Meal[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleSelectMeal = (slug: string) => {
    setLoading(true);
    router.push(`/meals/${slug}`);
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #ffa500",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      <main
        style={{
          minHeight: "100vh",
          background: "#181818",
          color: "#fff",
          padding: "40px 0",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <h1
          style={{
            color: "#ffa500",
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: 10,
          }}
        >
          🍽️ Explore Meals
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#ccc",
            maxWidth: "600px",
            margin: "0 auto 30px",
          }}
        >
          Explore our delicious and diverse selection of meals. From hearty
          classics to exotic new flavors, there&apos;s something to satisfy every
          craving.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 32,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {meals.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                color: "#ffa500",
              }}
            >
              No meals found.
            </div>
          ) : (
            meals.map((meal, idx) => (
              <div
                key={meal.id}
                onMouseEnter={() => setHovered(meal.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === meal.id ? "#222" : "#232323",
                  border:
                    hovered === meal.id
                      ? "2px solid #ffa500"
                      : "2px solid #333",
                  borderRadius: 16,
                  boxShadow:
                    hovered === meal.id
                      ? "0 4px 24px #ffa50044"
                      : "0 2px 8px #0006",
                  padding: 24,
                  transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 340,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  src={meal.image}
                  alt={meal.title}
                  width={140}
                  height={140}
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    border:
                      hovered === meal.id
                        ? "4px solid #ffa500"
                        : "4px solid #333",
                    marginBottom: 18,
                    boxShadow:
                      hovered === meal.id ? "0 0 0 6px #ffa50022" : undefined,
                    transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                  }}
                />
                <h2
                  style={{
                    color: "#ffa500",
                    fontSize: 24,
                    margin: "10px 0 6px",
                  }}
                >
                  {meal.title}
                </h2>
                <p
                  style={{
                    color: "#ccc",
                    fontSize: 16,
                    textAlign: "center",
                    flex: 1,
                  }}
                >
                  {meal.summary}
                </p>
                {hovered === meal.id && (
                  <button
                    style={{
                      marginTop: 18,
                      padding: "10px 24px",
                      background: "#ffa500",
                      color: "#181818",
                      border: "none",
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px #ffa50055",
                      transition: "background 0.2s",
                    }}
                    onClick={() => handleSelectMeal(meal.slug)}
                  >
                    Select Meal
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default MealsPageClient;
