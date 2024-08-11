const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const submitRating = async (req, res) => {
    const { user_id, movie_id, rating } = req.body;

    try {
        const { data: existingRating, error: fetchError } = await supabase
        .from("rating")
        .select("*")
        .eq("user_id", user_id)
        .eq("movie_id", movie_id)
        // .single();

        if (fetchError) throw fetchError;

        let response 
        if (existingRating) {
            response = await supabase
           .from("rating")
           .update({ rating })
           .eq("user_id", user_id)
           .eq("movie_id", movie_id);
        } else {
            response = await supabase
           .from("rating")
           .insert([{ user_id, movie_id, rating }]);
        }

        if (response.error) throw response.error;

        res.status(200).json({ message: "Rating saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving rating", details: error.message });
    }
};

const getRating = async (req, res) => {
    const { user_id, movie_id } = req.query
    console.log("Received user_id:", user_id, "movie_id:", movie_id);

    try {
        const { data, error } = await supabase
        .from("rating")
        .select('rating')
        .eq("user_id", user_id)
        .eq("movie_id", movie_id)
        // .single();

        if (error) throw error;

        res.status(200).json({ rating: data?.rating || 0 });
    } catch (error) {
        res.status(500).json({ error: "Error getting rating", details: error.message });
    }
}

const saveRating = async (req, res) => {
    const { user_id, movie_id, rating } = req.body;
    console.log("Received user_id:", user_id);
    console.log("Received movie_id:", movie_id);

    try {
        const { data, error } = await supabase
        .from("rating")
        .insert([{ user_id, movie_id, rating }])

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error saving rating", details: error.message });
    }

}

module.exports = {
    submitRating,
    getRating,
    saveRating,
};