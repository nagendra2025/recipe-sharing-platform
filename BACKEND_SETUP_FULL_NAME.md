# Backend Setup for Full Name Feature

This guide explains what you need to do in Supabase to add the `full_name` column to your database.

---

## Step 1: Run the Migration SQL

You have two options:

### Option A: Run Migration SQL (Recommended for Existing Database)

If you already have users in your database, use this migration:

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Open `supabase/migration_add_full_name.sql` from your project
4. **Copy ALL the content** from that file
5. Paste into SQL Editor
6. Click **Run** (or press `Ctrl+Enter`)
7. Wait for: **"Success. No rows returned"** ✅

**What this does:**
- Adds `full_name` column to `profiles` table
- Updates existing users: sets `full_name = display_name` for all existing profiles
- Updates the trigger function to populate `full_name` on new signups

### Option B: Update Schema.sql (For New Projects)

If you're setting up a fresh database, the `schema.sql` file has already been updated. Just run the entire `schema.sql` file as usual.

---

## Step 2: Verify the Column Was Added

1. Go to Supabase Dashboard → **Table Editor**
2. Click on **profiles** table
3. Check the columns - you should see:
   - ✅ `id`
   - ✅ `display_name`
   - ✅ `full_name` ← **NEW!**
   - ✅ `avatar_url`
   - ✅ `created_at`

---

## Step 3: Verify Existing Users (If Any)

If you have existing users:

1. Go to **Table Editor** → **profiles**
2. Check that existing users have `full_name` populated
3. It should match their `display_name` value

---

## Step 4: Test New Signups

1. Create a new test account at `/signup`
2. Check **Table Editor** → **profiles**
3. The new user should have:
   - `display_name` = the name they entered
   - `full_name` = the same value (populated automatically)

---

## ✅ That's It!

Once you run the migration SQL, the backend is ready. The UI changes are already implemented in the code.

---

## 🔍 Troubleshooting

### Error: "column already exists"

**Meaning**: The column was already added

**Solution**: This is fine! The migration uses `ADD COLUMN IF NOT EXISTS`, so it's safe to run again.

### Error: "relation does not exist"

**Meaning**: The `profiles` table doesn't exist

**Solution**: Run the main `schema.sql` file first, then run the migration.

### Existing users don't have full_name

**Solution**: The migration includes an UPDATE statement that should populate it. If it didn't work, you can manually run:

```sql
UPDATE profiles 
SET full_name = display_name 
WHERE full_name IS NULL AND display_name IS NOT NULL;
```

---

## 📋 Summary

**What you need to do:**
1. ✅ Run `supabase/migration_add_full_name.sql` in Supabase SQL Editor
2. ✅ Verify the column exists in Table Editor
3. ✅ Test by creating a new account or updating your profile

**What's already done in the code:**
- ✅ UI updated with `full_name` field
- ✅ Form handler updated to save `full_name`
- ✅ TypeScript types updated
- ✅ Schema.sql updated for future use

---

**After running the migration, you're all set!** 🎉

