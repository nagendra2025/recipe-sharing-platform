-- Sample Data for Recipe Sharing Platform
-- This script creates 3 test users and 10 sample recipes
-- Run this in Supabase SQL Editor after setting up your database

-- IMPORTANT: Replace the UUIDs below with actual user IDs from your auth.users table
-- To get user IDs, go to Supabase Dashboard → Authentication → Users
-- Copy the UUIDs and replace the placeholders below

-- Step 1: Get your user IDs
-- Go to Supabase Dashboard → Authentication → Users
-- Copy the UUIDs of 3 users (or create 3 test users first)

-- Step 2: Update the user IDs below
-- Replace '00000000-0000-0000-0000-000000000001' with your first user's UUID
-- Replace '00000000-0000-0000-0000-000000000002' with your second user's UUID
-- Replace '00000000-0000-0000-0000-000000000003' with your third user's UUID

-- ============================================
-- CREATE TEST USERS (Optional - if you don't have 3 users yet)
-- ============================================
-- You can create test users through the signup page, or use Supabase Auth API
-- For now, we'll assume you have 3 users and will update their profiles

-- ============================================
-- UPDATE PROFILES FOR 3 USERS
-- ============================================
-- This will update the first 3 profiles found (or you can manually specify user IDs)

-- Get user IDs first (for reference)
DO $$
DECLARE
  user1_id UUID;
  user2_id UUID;
  user3_id UUID;
BEGIN
  -- Get first 3 user IDs from profiles (which reference auth.users)
  SELECT id INTO user1_id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0;
  SELECT id INTO user2_id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1;
  SELECT id INTO user3_id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2;
  
  -- Check if we have at least 3 users
  IF user1_id IS NULL OR user2_id IS NULL OR user3_id IS NULL THEN
    RAISE EXCEPTION 'You need at least 3 users in your system. Please create 3 users first through the signup page.';
  END IF;
  
  -- Update profiles
  UPDATE profiles 
  SET 
    display_name = 'Sarah Johnson',
    full_name = 'Sarah Marie Johnson',
    avatar_url = NULL
  WHERE id = user1_id;
  
  UPDATE profiles 
  SET 
    display_name = 'Michael Chen',
    full_name = 'Michael Wei Chen',
    avatar_url = NULL
  WHERE id = user2_id;
  
  UPDATE profiles 
  SET 
    display_name = 'Emma Rodriguez',
    full_name = 'Emma Sofia Rodriguez',
    avatar_url = NULL
  WHERE id = user3_id;
END $$;

-- ============================================
-- INSERT 10 SAMPLE RECIPES
-- ============================================

-- Recipe 1: Classic Spaghetti Carbonara (User 1 - Sarah)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0),
  'Classic Spaghetti Carbonara',
  'A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper. Rich and creamy without any cream!',
  ARRAY[
    '400g spaghetti',
    '200g pancetta or guanciale, diced',
    '4 large eggs',
    '100g Pecorino Romano cheese, grated',
    'Black pepper, freshly ground',
    'Salt to taste'
  ],
  ARRAY[
    'Bring a large pot of salted water to boil and cook spaghetti until al dente.',
    'While pasta cooks, heat a large pan and cook pancetta until crispy.',
    'In a bowl, whisk eggs with grated cheese and black pepper.',
    'Drain pasta, reserving some pasta water.',
    'Add hot pasta to the pan with pancetta, remove from heat.',
    'Quickly add egg mixture, tossing constantly. Add pasta water if needed.',
    'Serve immediately with extra cheese and pepper.'
  ],
  15,
  20,
  'Italian',
  true,
  NOW() - INTERVAL '5 days'
);

-- Recipe 2: Chicken Tikka Masala (User 2 - Michael)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1),
  'Chicken Tikka Masala',
  'Creamy and aromatic Indian curry with tender chicken pieces in a rich tomato-based sauce.',
  ARRAY[
    '500g chicken breast, cut into chunks',
    '200ml heavy cream',
    '400g canned tomatoes',
    '1 large onion, diced',
    '3 cloves garlic, minced',
    '1 inch ginger, grated',
    '2 tbsp garam masala',
    '1 tsp turmeric',
    '1 tsp cumin',
    '1 tsp paprika',
    'Salt and pepper to taste',
    'Fresh cilantro for garnish'
  ],
  ARRAY[
    'Marinate chicken with yogurt, garam masala, and salt for 30 minutes.',
    'Heat oil in a large pan and cook chicken until golden. Set aside.',
    'In the same pan, sauté onions until soft. Add garlic and ginger.',
    'Add spices and cook for 1 minute until fragrant.',
    'Add tomatoes and simmer for 10 minutes until thickened.',
    'Add cream and cooked chicken. Simmer for 5 more minutes.',
    'Garnish with cilantro and serve with basmati rice or naan.'
  ],
  30,
  30,
  'Indian',
  true,
  NOW() - INTERVAL '4 days'
);

-- Recipe 3: Chocolate Chip Cookies (User 3 - Emma)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2),
  'Perfect Chocolate Chip Cookies',
  'Soft, chewy cookies with melty chocolate chips. The ultimate comfort dessert!',
  ARRAY[
    '225g butter, softened',
    '150g brown sugar',
    '100g white sugar',
    '2 large eggs',
    '1 tsp vanilla extract',
    '280g all-purpose flour',
    '1 tsp baking soda',
    '1 tsp salt',
    '300g chocolate chips'
  ],
  ARRAY[
    'Preheat oven to 375°F (190°C).',
    'Cream butter and both sugars until light and fluffy.',
    'Beat in eggs and vanilla extract.',
    'In a separate bowl, whisk flour, baking soda, and salt.',
    'Gradually mix dry ingredients into wet ingredients.',
    'Fold in chocolate chips.',
    'Drop rounded tablespoons onto baking sheets.',
    'Bake for 9-11 minutes until edges are golden.',
    'Cool on baking sheet for 5 minutes before transferring.'
  ],
  15,
  11,
  'Dessert',
  true,
  NOW() - INTERVAL '3 days'
);

-- Recipe 4: Margherita Pizza (User 1 - Sarah)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0),
  'Authentic Margherita Pizza',
  'Simple Italian pizza with fresh mozzarella, tomato sauce, and basil. Less is more!',
  ARRAY[
    '500g pizza dough',
    '200g fresh mozzarella, sliced',
    '200ml tomato sauce',
    'Fresh basil leaves',
    'Extra virgin olive oil',
    'Salt to taste'
  ],
  ARRAY[
    'Preheat oven to 475°F (245°C) with pizza stone if available.',
    'Roll out pizza dough on a floured surface.',
    'Spread tomato sauce evenly, leaving a border.',
    'Arrange mozzarella slices on top.',
    'Drizzle with olive oil and sprinkle salt.',
    'Bake for 10-12 minutes until crust is golden.',
    'Remove from oven and top with fresh basil.',
    'Drizzle with more olive oil and serve immediately.'
  ],
  20,
  12,
  'Italian',
  true,
  NOW() - INTERVAL '2 days'
);

-- Recipe 5: Pad Thai (User 2 - Michael)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1),
  'Authentic Pad Thai',
  'Classic Thai stir-fried noodles with tamarind, fish sauce, and your choice of protein.',
  ARRAY[
    '200g rice noodles',
    '200g shrimp or chicken',
    '2 eggs',
    '100g bean sprouts',
    '2 spring onions, chopped',
    '50g peanuts, crushed',
    '2 tbsp tamarind paste',
    '2 tbsp fish sauce',
    '1 tbsp palm sugar',
    '1 lime, juiced',
    '2 cloves garlic, minced',
    'Chili flakes to taste'
  ],
  ARRAY[
    'Soak rice noodles in warm water for 30 minutes until pliable.',
    'Mix tamarind paste, fish sauce, and palm sugar for the sauce.',
    'Heat oil in a wok and cook protein until done. Set aside.',
    'Add more oil and scramble eggs. Push to one side.',
    'Add garlic and drained noodles. Stir-fry for 2 minutes.',
    'Add sauce and toss everything together.',
    'Add bean sprouts and spring onions. Cook for 1 minute.',
    'Serve with lime, peanuts, and chili flakes on the side.'
  ],
  30,
  15,
  'Thai',
  true,
  NOW() - INTERVAL '1 day'
);

-- Recipe 6: Tiramisu (User 3 - Emma)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2),
  'Classic Tiramisu',
  'Layered Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
  ARRAY[
    '250g mascarpone cheese',
    '3 large eggs, separated',
    '75g sugar',
    '200ml strong coffee, cooled',
    '2 tbsp coffee liqueur (optional)',
    '24 ladyfinger biscuits',
    'Cocoa powder for dusting',
    'Dark chocolate, grated'
  ],
  ARRAY[
    'Brew strong coffee and let cool. Add liqueur if using.',
    'Separate eggs. Beat yolks with sugar until pale and creamy.',
    'Add mascarpone to yolks and mix until smooth.',
    'Beat egg whites until stiff peaks form. Fold into mascarpone mixture.',
    'Quickly dip ladyfingers in coffee (don''t soak too long).',
    'Layer half the ladyfingers in a dish.',
    'Spread half the mascarpone mixture on top.',
    'Repeat layers. Cover and refrigerate for at least 4 hours.',
    'Before serving, dust with cocoa powder and grated chocolate.'
  ],
  30,
  0,
  'Dessert',
  true,
  NOW() - INTERVAL '6 hours'
);

-- Recipe 7: Beef Lasagna (User 1 - Sarah)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0),
  'Hearty Beef Lasagna',
  'Layered pasta dish with rich meat sauce, béchamel, and lots of cheese. A family favorite!',
  ARRAY[
    '12 lasagna sheets',
    '500g ground beef',
    '1 onion, diced',
    '3 cloves garlic, minced',
    '800g canned tomatoes',
    '2 tbsp tomato paste',
    '500g ricotta cheese',
    '200g mozzarella, grated',
    '100g Parmesan, grated',
    'Fresh basil',
    'Salt, pepper, and Italian herbs'
  ],
  ARRAY[
    'Cook lasagna sheets according to package. Set aside.',
    'Brown ground beef in a large pan. Add onion and garlic.',
    'Add tomatoes, paste, and herbs. Simmer for 30 minutes.',
    'Mix ricotta with half the Parmesan and an egg.',
    'Layer: sauce, pasta, ricotta mixture, mozzarella. Repeat.',
    'Top with remaining mozzarella and Parmesan.',
    'Bake at 375°F (190°C) for 45 minutes until bubbly.',
    'Let rest for 15 minutes before serving.'
  ],
  45,
  45,
  'Italian',
  true,
  NOW() - INTERVAL '12 hours'
);

-- Recipe 8: Sushi Rolls (User 2 - Michael)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1),
  'Homemade Sushi Rolls',
  'Fresh and delicious sushi rolls you can make at home. Customize with your favorite fillings!',
  ARRAY[
    '2 cups sushi rice',
    '3 cups water',
    '4 tbsp rice vinegar',
    '2 tbsp sugar',
    '1 tsp salt',
    '4 sheets nori',
    '200g fresh salmon or tuna, sliced',
    '1 avocado, sliced',
    '1 cucumber, julienned',
    'Soy sauce, wasabi, and pickled ginger for serving'
  ],
  ARRAY[
    'Rinse rice until water runs clear. Cook with water.',
    'Mix vinegar, sugar, and salt. Heat until sugar dissolves.',
    'Fold vinegar mixture into cooked rice while still warm.',
    'Place nori on bamboo mat. Spread rice evenly, leaving top edge.',
    'Add fillings in a line across the middle.',
    'Roll tightly using the mat, pressing firmly.',
    'Slice into 8 pieces with a sharp, wet knife.',
    'Serve with soy sauce, wasabi, and pickled ginger.'
  ],
  60,
  20,
  'Japanese',
  true,
  NOW() - INTERVAL '8 hours'
);

-- Recipe 9: Red Velvet Cake (User 3 - Emma)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2),
  'Red Velvet Cake with Cream Cheese Frosting',
  'Moist, vibrant red cake with tangy cream cheese frosting. Perfect for special occasions!',
  ARRAY[
    '250g all-purpose flour',
    '200g sugar',
    '1 tsp baking soda',
    '1 tsp salt',
    '1 tsp cocoa powder',
    '250ml buttermilk',
    '2 eggs',
    '150ml vegetable oil',
    '1 tbsp red food coloring',
    '1 tsp vanilla extract',
    '1 tsp white vinegar',
    'For frosting: 250g cream cheese, 100g butter, 300g powdered sugar, 1 tsp vanilla'
  ],
  ARRAY[
    'Preheat oven to 350°F (175°C). Grease two 9-inch cake pans.',
    'Whisk dry ingredients in a large bowl.',
    'In another bowl, mix buttermilk, eggs, oil, food coloring, and vanilla.',
    'Combine wet and dry ingredients. Add vinegar at the end.',
    'Divide batter between pans. Bake for 25-30 minutes.',
    'Cool completely before frosting.',
    'For frosting: Beat cream cheese and butter. Add sugar and vanilla.',
    'Frost between layers and on top. Decorate as desired.'
  ],
  30,
  30,
  'Dessert',
  true,
  NOW() - INTERVAL '4 hours'
);

-- Recipe 10: Chicken Curry (User 2 - Michael)
INSERT INTO recipes (
  user_id,
  title,
  description,
  ingredients,
  steps,
  prep_time_mins,
  cook_time_mins,
  category,
  is_public,
  created_at
) VALUES (
  (SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1),
  'Creamy Coconut Chicken Curry',
  'Aromatic and creamy curry with tender chicken and vegetables in a coconut milk base.',
  ARRAY[
    '500g chicken thighs, cut into pieces',
    '400ml coconut milk',
    '1 large onion, sliced',
    '2 bell peppers, sliced',
    '3 cloves garlic, minced',
    '1 inch ginger, grated',
    '2 tbsp curry powder',
    '1 tsp turmeric',
    '1 tsp cumin',
    '1 can (400g) diced tomatoes',
    'Fresh cilantro',
    'Salt and pepper',
    '2 tbsp oil'
  ],
  ARRAY[
    'Heat oil in a large pot. Season and brown chicken pieces. Remove.',
    'In the same pot, sauté onions until soft. Add garlic and ginger.',
    'Add curry powder, turmeric, and cumin. Cook for 1 minute.',
    'Add tomatoes and cook until they break down.',
    'Return chicken to pot. Add coconut milk and bring to a simmer.',
    'Add bell peppers. Cover and simmer for 20 minutes.',
    'Season with salt and pepper. Garnish with cilantro.',
    'Serve over steamed rice or with naan bread.'
  ],
  20,
  30,
  'Indian',
  true,
  NOW() - INTERVAL '2 hours'
);

-- ============================================
-- VERIFICATION
-- ============================================
-- After running this script, verify the data:

-- Check profiles
SELECT id, display_name, full_name FROM profiles ORDER BY created_at LIMIT 3;

-- Check recipes
SELECT 
  r.id,
  r.title,
  r.category,
  p.display_name as author,
  r.created_at
FROM recipes r
JOIN profiles p ON r.user_id = p.id
ORDER BY r.created_at DESC;

-- Count recipes per user
SELECT 
  p.display_name,
  COUNT(r.id) as recipe_count
FROM profiles p
LEFT JOIN recipes r ON p.id = r.user_id
GROUP BY p.display_name
ORDER BY recipe_count DESC;

