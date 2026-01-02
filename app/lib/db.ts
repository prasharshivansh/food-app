import Database from "better-sqlite3";

const db = new Database("meals.db");

function initDb() {
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

  // Clear the table before inserting new data
  db.exec("DELETE FROM recipes");

  const dummyMeals = [
      {
        title: 'Gourmet Angus Burger',
        slug: 'gourmet-angus-burger',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop',
        summary: 'A juicy Angus beef burger with truffle aioli, arugula, and Gruyère cheese on a brioche bun.',
        instructions: '1. Cook patty. 2. Toast bun. 3. Assemble burger with aioli, arugula, and cheese.',
        creator: 'Chef Alex',
        creator_email: 'alex@example.com',
      },
      {
        title: 'Vegan Buddha Bowl',
        slug: 'vegan-buddha-bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
        summary: 'A vibrant and nutritious bowl of quinoa, roasted sweet potatoes, chickpeas, avocado, and a tahini dressing.',
        instructions: '1. Cook quinoa. 2. Roast vegetables. 3. Assemble all ingredients in a bowl and drizzle with dressing.',
        creator: 'Chef Chloe',
        creator_email: 'chloe@example.com',
      },
      {
        title: 'Authentic Seafood Paella',
        slug: 'authentic-seafood-paella',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzThhkPnd45SBLEyvHqC6wDb0izvjRfLCIQ&s',
        summary: 'A traditional Spanish rice dish loaded with shrimp, mussels, and clams, infused with saffron and smoky paprika.',
        instructions: '1. Sauté sofrito. 2. Add rice and toast. 3. Add broth and seafood. 4. Simmer until rice is cooked.',
        creator: 'Chef Miguel',
        creator_email: 'miguel@example.com',
      },
      {
        title: 'Creamy Mushroom Risotto',
        slug: 'creamy-mushroom-risotto',
        image: 'https://i0.wp.com/cookingitalians.com/wp-content/uploads/2025/04/image.jpeg?fit=1152%2C864&ssl=1',
        summary: 'A rich and creamy Italian risotto made with Arborio rice, wild mushrooms, and Parmesan cheese.',
        instructions: '1. Sauté mushrooms. 2. Toast rice. 3. Gradually add hot broth while stirring. 4. Stir in Parmesan and butter.',
        creator: 'Chef Isabella',
        creator_email: 'isabella@example.com',
      },
      {
        title: 'Spicy Chicken Shawarma',
        slug: 'spicy-chicken-shawarma',
        image: 'https://foxeslovelemons.com/wp-content/uploads/2023/06/Chicken-Shawarma-8.jpg',
        summary: 'Tender, juicy chicken marinated in a blend of Middle Eastern spices, served in a warm pita with garlic sauce.',
        instructions: '1. Marinate chicken. 2. Cook on a vertical spit or in a pan. 3. Shave chicken and serve in pita.',
        creator: 'Chef Fatima',
        creator_email: 'fatima@example.com',
      }
  ];

  const insert = db.prepare(`
    INSERT INTO recipes (title, slug, image, summary, instructions, creator, creator_email)
    VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)
    `);

  db.transaction(() => {
    for (const meal of dummyMeals) {
      insert.run(meal);
    }
  })();
}

initDb();

export default db;
