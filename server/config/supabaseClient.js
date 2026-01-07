const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Role Key for Admin Backend

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env');
} else {
    console.log('Supabase URL:', supabaseUrl);
    console.log('FULL Supabase Key:', supabaseKey);
    // Decode JWT to check role
    try {
        const payload = JSON.parse(Buffer.from(supabaseKey.split('.')[1], 'base64').toString());
        console.log('JWT Role:', payload.role);
    } catch (e) {
        console.log('Could not decode JWT');
    }
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

module.exports = supabase;
