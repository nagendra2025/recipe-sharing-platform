# How to Insert Sample Data for Testing

This guide will help you insert 10 sample recipes from 3 different users to test the search functionality.

---

## Prerequisites

- ✅ Database schema is set up
- ✅ You have at least 3 users in your system (or create them first)

---

## Step 1: Create Test Users (Required!)

**You MUST create 3 users first before running the SQL script.**

### Option A: Via Signup Page (Recommended)

1. Go to http://localhost:3000/signup
2. Create 3 test accounts:
   - **User 1**: Email: `sarah@test.com`, Display Name: `Sarah Johnson`
   - **User 2**: Email: `michael@test.com`, Display Name: `Michael Chen`
   - **User 3**: Email: `emma@test.com`, Display Name: `Emma Rodriguez`

### Option B: Via Supabase Dashboard

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** button
3. Create 3 users with any valid email addresses
4. Note: Profiles will be created/updated by the SQL script

---

## Step 2: Get User IDs

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Note down the **UUIDs** of your 3 users (or the 3 most recent users)
3. You'll need these to update the profiles

**Alternative**: The SQL script will automatically use the first 3 users in your system, so you can skip this if you want to use existing users.

---

## Step 3: Run the Sample Data SQL

**IMPORTANT**: Use the fixed version `supabase/sample_data_v2.sql` which handles user IDs correctly.

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Open `supabase/sample_data_v2.sql` from your project (use the v2 file!)
4. **Copy ALL the content** from that file
5. Paste into SQL Editor
6. Click **Run** (or press `Ctrl+Enter`)
7. Wait for: **"Success. No rows returned"** or confirmation messages ✅

**Note**: If you get an error about needing 3 users, make sure you have created at least 3 user accounts through the signup page first.

---

## Step 4: Verify the Data

### Check Profiles

1. Go to **Table Editor** → **profiles**
2. You should see 3 profiles updated with:
   - Sarah Johnson (Sarah Marie Johnson)
   - Michael Chen (Michael Wei Chen)
   - Emma Rodriguez (Emma Sofia Rodriguez)

### Check Recipes

1. Go to **Table Editor** → **recipes**
2. You should see 10 recipes:
   - 4 recipes by Sarah (Italian cuisine)
   - 4 recipes by Michael (Asian cuisine)
   - 2 recipes by Emma (Desserts)

---

## Step 5: Test Search Functionality

1. Go to http://localhost:3000
2. Try searching for:

   - **"chicken"** - Should find Chicken Tikka Masala and Chicken Curry
   - **"pasta"** - Should find Spaghetti Carbonara and Lasagna
   - **"chocolate"** - Should find Chocolate Chip Cookies
   - **"Italian"** - Should find Italian recipes
   - **"curry"** - Should find curry recipes
   - **"dessert"** - Should find dessert recipes

3. Test category filters:
   - Click on **Italian** - Should show 3 recipes
   - Click on **Dessert** - Should show 2 recipes
   - Click on **Indian** - Should show 2 recipes

---

## Sample Recipes Included

### By Sarah Johnson (Italian Cuisine):

1. Classic Spaghetti Carbonara
2. Authentic Margherita Pizza
3. Hearty Beef Lasagna

### By Michael Chen (Asian Cuisine):

1. Chicken Tikka Masala
2. Authentic Pad Thai
3. Sushi Rolls
4. Creamy Coconut Chicken Curry

### By Emma Rodriguez (Desserts):

1. Perfect Chocolate Chip Cookies
2. Classic Tiramisu
3. Red Velvet Cake with Cream Cheese Frosting

**Total: 10 recipes across 3 users**

---

## Troubleshooting

### Error: "relation does not exist"

**Solution**: Make sure you've run the main `schema.sql` file first.

### Error: "null value in column user_id violates not-null constraint"

**Solution**:

- **Use the FIXED version**: `supabase/sample_data_fixed.sql` (not the original one)
- The fixed version uses a DO block to properly get user IDs
- Make sure you have at least 3 users in your system

### Error: "violates foreign key constraint"

**Solution**: Make sure you have at least 3 users in your `auth.users` table. The script uses the first 3 users by creation date.

### No recipes appear after running

**Solution**:

1. Check that recipes were inserted: Go to Table Editor → recipes
2. Verify `is_public` is `true` for all recipes
3. Check that user_ids match existing profiles

### Search not working

**Solution**:

1. Make sure the enhanced search code is deployed (check `app/page.tsx`)
2. Restart your dev server: `npm run dev`
3. Clear browser cache and try again

---

## Customizing the Data

If you want to modify the recipes:

1. Edit `supabase/sample_data.sql`
2. Change ingredients, steps, or other details
3. Run the modified SQL again (you may need to delete existing recipes first)

---

## Next Steps

After inserting the sample data:

1. ✅ Test search functionality
2. ✅ Test category filters
3. ✅ View recipes on home page
4. ✅ Click on individual recipes to view details
5. ✅ Test creating your own recipes

---

**You're all set! Enjoy testing the search functionality!** 🎉
