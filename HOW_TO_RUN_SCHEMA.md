# How to Run the Database Schema in Supabase

Follow these steps to set up your database tables and security policies.

---

## Step-by-Step Instructions

### Step 1: Open SQL Editor in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (recipe-sharing-platform)
3. In the **left sidebar**, find and click on **SQL Editor**
   - It's usually near the top, with a database/query icon
   - You might see it under a "Database" or "Development" section

### Step 2: Create a New Query

1. Once in SQL Editor, look for the **"New Query"** button
   - It's usually in the **top right corner** of the SQL Editor page
   - Or you might see a **"+"** button or **"New"** button
2. Click it to open a new query tab/editor

### Step 3: Open the Schema File

1. In your project folder, open the file: `supabase/schema.sql`
2. **Select ALL** the content (Ctrl+A or Cmd+A)
3. **Copy** it (Ctrl+C or Cmd+C)
   - Make sure you copy **ALL 108 lines**!

### Step 4: Paste into SQL Editor

1. Go back to Supabase Dashboard (SQL Editor tab)
2. Click in the **SQL Editor text area** (the big empty box)
3. **Paste** the schema (Ctrl+V or Cmd+V)
4. You should see all the SQL code pasted

### Step 5: Run the Query

You have **two options** to run the query:

**Option A: Using the Run Button**
1. Look for a **"Run"** button (usually green or blue)
2. It might say "Run" or have a play icon ▶️
3. Click it

**Option B: Using Keyboard Shortcut**
1. Press **Ctrl+Enter** (Windows/Linux)
2. Or **Cmd+Enter** (Mac)

### Step 6: Wait for Success

1. The query will start executing
2. You'll see a loading indicator
3. After a few seconds, you should see:
   - ✅ **"Success. No rows returned"** message
   - Or a green checkmark ✅
   - Or "Query executed successfully"

**If you see an error**, don't worry! Scroll down to the "Troubleshooting" section below.

---

## ✅ Verify It Worked

After running the schema, verify everything was created:

### Check Tables

1. In Supabase Dashboard, click **Table Editor** (left sidebar)
2. You should see **two tables**:
   - ✅ `profiles`
   - ✅ `recipes`

### Check Policies

1. Click on the **`profiles`** table
2. Click on the **Policies** tab (at the top)
3. You should see **3 policies**:
   - "Public profiles are viewable by everyone"
   - "Users can update own profile"
   - "Users can insert own profile"

4. Click on the **`recipes`** table
5. Click on the **Policies** tab
6. You should see **4 policies**:
   - "Public recipes are viewable by everyone"
   - "Users can insert own recipes"
   - "Users can update own recipes"
   - "Users can delete own recipes"

---

## 🎯 Quick Visual Guide

```
Supabase Dashboard
    ↓
Left Sidebar → SQL Editor
    ↓
Click "New Query" button (top right)
    ↓
Open supabase/schema.sql in your project
    ↓
Copy ALL content (Ctrl+A, Ctrl+C)
    ↓
Paste into SQL Editor (Ctrl+V)
    ↓
Click "Run" button OR Press Ctrl+Enter
    ↓
Wait for "Success. No rows returned" ✅
    ↓
Verify in Table Editor (should see profiles and recipes tables)
```

---

## 🔍 Troubleshooting

### Error: "relation already exists"

**Meaning**: Some tables already exist (maybe you ran it before)

**Solution**: 
- This is usually OK - the schema uses `CREATE TABLE IF NOT EXISTS`
- Just continue - it should still work
- If you see this error, check Table Editor to see if tables exist

### Error: "permission denied"

**Meaning**: Your user doesn't have permission

**Solution**:
- Make sure you're logged into Supabase as the project owner
- Check that you're in the correct project

### Error: "syntax error at or near..."

**Meaning**: SQL syntax issue

**Solution**:
- Make sure you copied the **entire** schema.sql file
- Don't copy just part of it
- Try copying again from the beginning

### Error: "extension uuid-ossp does not exist"

**Meaning**: UUID extension issue

**Solution**:
- The schema should handle this with `CREATE EXTENSION IF NOT EXISTS`
- If you see this, try running just the first line:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```
- Then run the rest of the schema

### Nothing Happens / No Response

**Solution**:
- Check your internet connection
- Refresh the page
- Try running again
- Check if there's a loading indicator

---

## 📝 Alternative: Run in Parts

If running the entire schema at once doesn't work, you can run it in parts:

### Part 1: Extensions and Tables
Run lines 1-27 (up to the end of recipes table creation)

### Part 2: Indexes
Run lines 29-34 (indexes)

### Part 3: Functions and Triggers
Run lines 36-49 (update timestamp function and trigger)

### Part 4: RLS Policies
Run lines 51-91 (RLS enable and policies)

### Part 5: Profile Creation Trigger
Run lines 93-108 (handle_new_user function and trigger)

---

## ✅ Success Checklist

After running the schema, verify:

- [ ] SQL Editor shows "Success. No rows returned"
- [ ] Table Editor shows `profiles` table
- [ ] Table Editor shows `recipes` table
- [ ] `profiles` table has 3 policies
- [ ] `recipes` table has 4 policies
- [ ] No error messages in SQL Editor

---

## 🚀 Next Steps

Once the schema is successfully run:

1. ✅ **Try signing up again** at http://localhost:3000/signup
2. ✅ **Check Supabase Dashboard** → Authentication → Users (should see your user)
3. ✅ **Check Table Editor** → profiles (should see your profile automatically created)
4. ✅ **Continue with Storage setup** (create recipe-images and avatars buckets)

---

## 💡 Pro Tip

If you're unsure if the schema ran successfully:
1. Go to **Table Editor**
2. If you see `profiles` and `recipes` tables → ✅ Success!
3. If you don't see them → Run the schema again

---

**Need more help?** Check the error message you see and refer to the troubleshooting section above, or let me know what error you're getting!

