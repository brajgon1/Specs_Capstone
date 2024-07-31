const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getWatchlist = async (req, res) => {
  const userId = req.query.userId;

  try {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res
        .status(500)
        .json({ error: "Error getting watchlist", details: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error getting watchlist", details: err.message });
  }
};

const saveWatchlist = async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const { data, error } = await supabase
      .from("watchlists")
      .insert([{ user_id: userId, movie_id: movieId }], {
        returning: "minimal",
      });

    if (error) {
      return res
        .status(500)
        .json({ error: "Error saving watchlist", details: error.message });
    }

    res.status(200).json({ message: "Watchlist saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving watchlist", details: error.message });
  }
};

const deleteFromWatchlist = async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const { error } = await supabase
      .from("watchlists")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (error) {
      return res
        .status(500)
        .json({ error: "Error deleting from watchlist", details: error.message });
    }

    res.status(200).json({ message: "Movie removed from watchlist successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting from watchlist", details: error.message });
  }
};

module.exports = {
  getWatchlist,
  saveWatchlist,
  deleteFromWatchlist,
};