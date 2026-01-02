import Database from "better-sqlite3";

// Initialize SQLite database (creates file if not exists)
const db = new Database("meals.db");

db.exec(`
CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT NOT NULL,
  summary TEXT NOT NULL,
  instructions TEXT NOT NULL,
  creator TEXT NOT NULL,
  creator_email TEXT NOT NULL
);
`);

const dummyMeals = [
  {
    title: "Paneer Buter Masala",
    slug: "paneer-butter-masala",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.jpg",
    summary:
      "A rich and creamy North Indian curry made with paneer, tomatoes, and aromatic spices.",
    instructions:
      "1. Sauté onions and tomatoes. 2. Add spices and cook. 3. Blend to a smooth sauce. 4. Add paneer and simmer. 5. Finish with cream.",
    creator: "Chef Anjali",
    creator_email: "anjali@example.com",
  },
  {
    title: "Spicy Orange Chicken Tacos",
    slug: "spicy-orange-chicken-tacos",
    image:
      "https://media.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y25_R1023_W02_CA_RC155527-1_Main_low-6aae5c8f.jpg",
    summary:
      "Tacos filled with spicy orange-marinated chicken and fresh toppings.",
    instructions:
      "1. Marinate chicken. 2. Cook chicken. 3. Assemble tacos with toppings.",
    creator: "Chef Maria",
    creator_email: "maria@example.com",
  },
  {
    title: "Sweet Potato & Black Bean Chili",
    slug: "sweet-potato-black-bean-chili",
    image: "https://www.noracooks.com/wp-content/uploads/2017/02/Square.jpg",
    summary: "A hearty vegetarian chili with sweet potatoes and black beans.",
    instructions:
      "1. Sauté onions and garlic. 2. Add sweet potatoes, beans, and spices. 3. Simmer until tender.",
    creator: "Chef Nora",
    creator_email: "nora@example.com",
  },
];

const insert = db.prepare(`
INSERT OR IGNORE INTO recipes (title, slug, image, summary, instructions, creator, creator_email)
VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)
`);

db.transaction(() => {
  for (const meal of dummyMeals) {
    insert.run(meal);
  }
})();

db.close();

console.log("Database initialized with dummy meals.");
