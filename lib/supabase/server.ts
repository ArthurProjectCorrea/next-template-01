import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from '@supabase/supabase-js';

// helper that returns a Supabase client using the values from the environment
// variables described in docs/supabase/quickstarts.md.  The values are
// marked `NEXT_PUBLIC` so they can be accessed on both the server and in the
// browser; we throw early if they're missing so errors are easier to diagnose.
export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)'
    );
  }

  return createSupabaseClient(url, key);
}
