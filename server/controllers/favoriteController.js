const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getFavorites = async (req, res) => {
    const userId = req.query.userId;
    console.log(userId)

    try {
        const { data, error } = await supabase
        .from("favorites")
        .select("*, movies(*)")
        .eq("user_id", userId);

        if (error) {
            return res.status(500).json({ error: "Error getting favorites", details: error.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error getting favorites", details: error.message });
    }
};

const saveFavorites = async (req, res) => {
    const { userId, movieId } = req.body;

    try {
        const { data, error } = await supabase
       .from("favorites")
       .insert([{ user_id: userId, movie_id: movieId }]);

       if (error) {
        return res.status(500).json({ error: "Error saving favorites", details: error.message });
       }

       res.status(200).json({ message: "Favorites saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving favorites", details: error.message });
    }
};

const deleteFromFavorites = async (req, res) => {
    const { user_id, movie_id } = req.body;
    console.log(user_id, movie_id);
    try {
        const { data, error } = await supabase
       .from("favorites")
       .delete()
       .eq("user_id", user_id)
       .eq("movie_id", movie_id);

       if (error) {
        return res.status(500).json({ error: "Error deleting favorites", details: error.message });
       }

       res.status(200).json({ message: "Favorites deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting favorites", details: error.message });
    }
}

module.exports = {
    getFavorites,
    saveFavorites,
    deleteFromFavorites,
}
