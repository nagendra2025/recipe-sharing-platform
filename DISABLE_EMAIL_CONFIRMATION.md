# How to Disable Email Confirmation for Development

This guide will help you disable email confirmation in Supabase so you can sign up users instantly without email verification.

---

## Quick Steps

1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Click on **Email** provider
3. Find **"Confirm email"** setting
4. Toggle it **OFF** ✅
5. Click **Save**

**That's it!** Users can now sign up and use the app immediately.

---

## Detailed Steps with Screenshots Guide

### Step 1: Navigate to Email Provider Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. In the left sidebar, click **Authentication**
4. In the **CONFIGURATION** section, click **Sign In / Providers**
5. You'll see a list of providers - click on **Email**

### Step 2: Disable Email Confirmation

1. On the Email provider settings page, look for:
   - **"Confirm email"** toggle/switch
   - Or **"Enable email confirmations"** setting
2. **Toggle it OFF** (should be gray/unchecked)
3. Scroll down and click **Save** button

### Step 3: Verify the Setting

After saving, the setting should be:
- ✅ **OFF** / **Disabled** / **Unchecked**

---

## Alternative: Using Real Email Addresses

If you prefer to keep email confirmation enabled, you can:

1. Use **real email addresses** you have access to:
   - Your personal Gmail
   - Your work email
   - Any email you can check

2. Sign up with those emails
3. Check your email for confirmation links
4. Click the confirmation link
5. Then you can use the account

---

## For Sample Data Setup

If you're creating test users for sample data:

### Option 1: Disable Email Confirmation (Recommended for Development)

1. Follow the steps above to disable email confirmation
2. Then create users with any email addresses (even `test@test.com` will work)
3. Users can sign up and use the app immediately

### Option 2: Use Real Email Addresses

1. Keep email confirmation enabled
2. Use real email addresses you can access
3. Check emails and confirm accounts
4. Then run the sample data SQL

---

## Testing After Disabling

1. Go to http://localhost:3000/signup
2. Try signing up with `sarah@test.com`
3. It should work immediately without email confirmation ✅
4. You'll be redirected to `/dashboard` right away

---

## Re-enabling for Production

When you're ready for production:

1. Go back to **Authentication** → **Sign In / Providers** → **Email**
2. Toggle **"Confirm email"** back **ON**
3. Click **Save**
4. Set up proper SMTP (see the warning banner in Email Templates section)

---

## Troubleshooting

### Still seeing "email is invalid" error

**Possible causes:**
1. Email confirmation is still enabled - check the toggle again
2. Supabase is blocking test email domains - use a real email domain
3. Browser cache - try clearing cache or incognito mode

**Solution:**
- Double-check the "Confirm email" toggle is OFF
- Try using a real email address (like Gmail)
- Restart your dev server after changing settings

### Users can't sign up even after disabling

**Solution:**
1. Make sure you clicked **Save** after toggling
2. Wait a few seconds for changes to propagate
3. Try signing up again
4. Check browser console for errors

---

## Summary

**To disable email confirmation:**
1. Authentication → Sign In / Providers → Email
2. Toggle "Confirm email" OFF
3. Click Save
4. Done! ✅

**For development, this is the recommended setting** - it makes testing much faster!

