const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Role Key for Admin Backend

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
