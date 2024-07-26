const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from("users").select("*");

        if (error) {
            return res
                .status(500)
                .json({ error: "Error getting users", details: error.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res
            .status(500)
            .json({ error: "Error getting users", details: error.message });
    }
};

module.exports = {
    getUsers,
};