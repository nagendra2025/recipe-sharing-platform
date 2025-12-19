# Complete Sample Data Setup Guide

This guide provides **two methods** to set up sample data with 3 users and 10 recipes.

---

## 🎯 Quick Start (Recommended)

### Method 1: Create Users via Signup Page (Easiest)

1. **Disable Email Confirmation** (Recommended for Development):
   - Go to Supabase Dashboard → **Authentication** → **Sign In / Providers** → **Email**
   - Toggle **"Confirm email"** OFF
   - Click **Save**
   - See `DISABLE_EMAIL_CONFIRMATION.md` for detailed instructions

2. **Create 3 Users**:
   - Go to http://localhost:3000/signup
   - Create these 3 accounts (any email addresses will work now):
     - **User 1**: Email: `sarah@test.com`, Display Name: `Sarah Johnson`
     - **User 2**: Email: `michael@test.com`, Display Name: `Michael Chen`
     - **User 3**: Email: `emma@test.com`, Display Name: `Emma Rodriguez`
   - **Note**: If email confirmation is disabled, you can use any email format!

2. **Run the SQL Script**:
   - Go to Supabase Dashboard → **SQL Editor**
   - Click **New Query**
   - Open `supabase/complete_sample_data.sql`
   - Copy ALL content and paste
   - Click **Run** (or `Ctrl+Enter`)
   - ✅ Done! You'll have 3 profiles and 10 recipes

---

## 📋 What the Script Does

The `complete_sample_data.sql` script:

1. ✅ **Checks** if you have at least 3 users
2. ✅ **Gets** the first 3 user IDs automatically
3. ✅ **Creates or Updates** profiles for those users
4. ✅ **Inserts** 10 sample recipes distributed across the 3 users

**No manual user ID entry needed!** The script handles everything automatically.

---

## 🔍 Method 2: Create Users via Supabase Dashboard

If you prefer to create users in the dashboard:

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** button
3. Create 3 users with:
   - Email addresses (any valid emails)
   - Passwords (save them if you want to log in)
4. Then run `supabase/complete_sample_data.sql` as described above

---

## ✅ After Running the Script

### Verify Profiles

1. Go to **Table Editor** → **profiles**
2. You should see 3 profiles:
   - Sarah Johnson (Sarah Marie Johnson)
   - Michael Chen (Michael Wei Chen)
   - Emma Rodriguez (Emma Sofia Rodriguez)

### Verify Recipes

1. Go to **Table Editor** → **recipes**
2. You should see 10 recipes:
   - 3 recipes by Sarah (Italian cuisine)
   - 4 recipes by Michael (Asian cuisine)
   - 3 recipes by Emma (Desserts)

### Test in Your App

1. Go to http://localhost:3000
2. You should see all 10 recipes
3. Try searching for:
   - "chicken" → Should find 2 recipes
   - "pasta" → Should find 2 recipes
   - "chocolate" → Should find 1 recipe
   - "Italian" → Should find 3 recipes

---

## 🆘 Troubleshooting

### Error: "You need at least 3 users"

**Solution**: 
- Create 3 users first via signup page or dashboard
- Then run the script again

### Error: "Could not find 3 valid user IDs"

**Solution**:
- Make sure you have exactly 3 or more users
- Check Supabase Dashboard → Authentication → Users
- Verify users have profiles (they should be created automatically on signup)

### Profiles not updated

**Solution**:
- The script creates profiles if they don't exist
- If profiles already exist, it updates them
- Check Table Editor → profiles to verify

---

## 📊 Sample Data Summary

### Users Created:
1. **Sarah Johnson** - Italian Cuisine Expert
2. **Michael Chen** - Asian Cuisine Expert  
3. **Emma Rodriguez** - Dessert Specialist

### Recipes Created (10 total):

**By Sarah (3 recipes):**
- Classic Spaghetti Carbonara
- Authentic Margherita Pizza
- Hearty Beef Lasagna

**By Michael (4 recipes):**
- Chicken Tikka Masala
- Authentic Pad Thai
- Homemade Sushi Rolls
- Creamy Coconut Chicken Curry

**By Emma (3 recipes):**
- Perfect Chocolate Chip Cookies
- Classic Tiramisu
- Red Velvet Cake with Cream Cheese Frosting

---

## 🎉 You're All Set!

After running the script:
- ✅ 3 user profiles ready
- ✅ 10 sample recipes ready
- ✅ Search functionality testable
- ✅ Category filters working

**Enjoy testing your recipe sharing platform!** 🍳

