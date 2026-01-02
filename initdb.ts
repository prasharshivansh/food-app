import Database from 'better-sqlite3';

// Initialize SQLite database (creates file if not exists)
const db = new Database('meals.db');

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
    title: 'Paneer Butter Masala',
    slug: 'paneer-butter-masala',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.jpg',
    summary: 'A rich and creamy North Indian curry made with paneer, tomatoes, and aromatic spices.',
    instructions: '1. Sauté onions and tomatoes. 2. Add spices and cook. 3. Blend to a smooth sauce. 4. Add paneer and simmer. 5. Finish with cream.',
    creator: 'Chef Anjali',
    creator_email: 'anjali@example.com',
  },
  {
    title: 'Spicy Orange Chicken Tacos',
    slug: 'spicy-orange-chicken-tacos',
    image: 'https://media.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y25_R1023_W02_CA_RC155527-1_Main_low-6aae5c8f.jpg',
    summary: 'Tacos filled with spicy orange-marinated chicken and fresh toppings.',
    instructions: '1. Marinate chicken. 2. Cook chicken. 3. Assemble tacos with toppings.',
    creator: 'Chef Maria',
    creator_email: 'maria@example.com',
  },
  {
    title: 'Sweet Potato & Black Bean Chili',
    slug: 'sweet-potato-black-bean-chili',
    image: 'https://www.noracooks.com/wp-content/uploads/2017/02/Square.jpg',
    summary: 'A hearty vegetarian chili with sweet potatoes and black beans.',
    instructions: '1. Sauté onions and garlic. 2. Add sweet potatoes, beans, and spices. 3. Simmer until tender.',
    creator: 'Chef Nora',
    creator_email: 'nora@example.com',
  },
  {
    title: 'Juicy Cheeseburger',
    slug: 'juicy-cheeseburger',
    image: 'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsus-s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
    summary: 'A classic American cheeseburger with a juicy beef patty, melted cheddar cheese, and fresh vegetables.',
    instructions: '1. Form beef patties. 2. Grill patties to desired doneness. 3. Melt cheese on top. 4. Assemble burger in a toasted bun with lettuce, tomato, and onion.',
    creator: 'Chef John',
    creator_email: 'john@example.com',
  },
  {
    title: 'Creamy Tomato Pasta',
    slug: 'creamy-tomato-pasta',
    image: 'https://www.allrecipes.com/thmb/5SdUVhHTMs-rta5sV6F8kBFoTQQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/92601-creamy-tomato-pasta-ddmfs-4X3-0498-5c1a1220228349278381c8173c38e630.jpg',
    summary: 'A simple yet elegant pasta dish with a creamy tomato sauce, fresh basil, and a sprinkle of Parmesan.',
    instructions: '1. Cook pasta. 2. Sauté garlic in olive oil. 3. Add crushed tomatoes and cream. 4. Simmer sauce. 5. Toss with pasta and basil.',
    creator: 'Chef Sophia',
    creator_email: 'sophia@example.com',
  },
  {
    title: 'Veggie Stir-Fry',
    slug: 'veggie-stir-fry',
    image: 'https://hips.hearstapps.com/hmg-prod/images/veggie-stir-fry-1597687353.jpg?crop=0.771xw:0.514xh;0.122xw,0.247xh&resize=1200:*',
    summary: 'A quick and healthy stir-fry packed with colorful vegetables in a savory sauce.',
    instructions: '1. Chop vegetables. 2. Heat oil in a wok. 3. Stir-fry vegetables until crisp-tender. 4. Add sauce and toss to coat.',
    creator: 'Chef Kenji',
    creator_email: 'kenji@example.com',
  },
  {
    title: 'Classic Margherita Pizza',
    slug: 'classic-margherita-pizza',
    image: 'https://static01.nyt.com/images/2014/04/09/dining/09JPPIZZA2/09JPPIZZA2-master768.jpg',
    summary: 'A traditional Italian pizza with a simple yet delicious combination of San Marzano tomatoes, fresh mozzarella, basil, and a drizzle of olive oil.',
    instructions: '1. Prepare pizza dough. 2. Spread tomato sauce. 3. Top with mozzarella and basil. 4. Bake until crust is golden and cheese is bubbly.',
    creator: 'Chef Gino',
    creator_email: 'gino@example.com',
  },
  {
    title: 'Thai Green Curry',
    slug: 'thai-green-curry',
    image: 'https://www.kitchensanctuary.com/wp-content/uploads/2019/02/Thai-Green-Chicken-Curry-square-FS-2-2.jpg',
    summary: 'A fragrant and spicy Thai green curry with chicken, coconut milk, and a variety of vegetables.',
    instructions: '1. Sauté green curry paste. 2. Add coconut milk and chicken. 3. Simmer until chicken is cooked. 4. Add vegetables and cook until tender.',
    creator: 'Chef Priya',
    creator_email: 'priya@example.com',
  },
  {
    title: 'Chocolate Lava Cakes',
    slug: 'chocolate-lava-cakes',
    image: 'https://celebratingsweets.com/wp-content/uploads/2015/01/Chocolate-Lava-Cakes-2.jpg',
    summary: 'Decadent individual chocolate cakes with a molten, gooey center. The perfect dessert for chocolate lovers.',
    instructions: '1. Melt chocolate and butter. 2. Whisk eggs and sugar. 3. Combine mixtures with flour. 4. Bake in ramekins until edges are set.',
    creator: 'Chef Emily',
    creator_email: 'emily@example.com',
  },
  {
    title: 'Lemon Herb Roasted Chicken',
    slug: 'lemon-herb-roasted-chicken',
    image: 'https://www.recipetineats.com/wp-content/uploads/2023/09/Slow-roasted-lemon-herb-chicken_2a.jpg',
    summary: 'A whole roasted chicken seasoned with lemon, herbs, and garlic for a flavorful and juicy main course.',
    instructions: '1. Season chicken. 2. Stuff cavity with lemon and herbs. 3. Roast until golden brown and cooked through.',
    creator: 'Chef David',
    creator_email: 'david@example.com',
  },
  {
    title: 'Sushi Platter',
    slug: 'sushi-platter',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGklMjBwbGF0dGVyfGVufDB8fDB8fHww',
    summary: 'A beautiful assortment of fresh sushi, including nigiri and maki rolls, showcasing a variety of fish and vegetables.',
    instructions: '1. Prepare sushi rice. 2. Slice fish and vegetables. 3. Assemble nigiri and roll maki. 4. Arrange on a platter and serve with soy sauce, wasabi, and ginger.',
    creator: 'Chef Hiro',
    creator_email: 'hiro@example.com',
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

console.log('Database initialized with dummy meals.');
