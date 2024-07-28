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
            return res.status(500).json({ error: "Error getting watchlist", details: error.message });
          }

          res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Error getting watchlist", details: error.message });
    }
}

const saveWatchlist = async (req, res) => {
    const { userId, watchlist } = req.body;
  
    try {
      const { error } = await supabase
        .from("watchlists")
        .upsert({ user_id: userId, watchlist });
  
      if (error) {
        return res.status(500).json({ error: "Error saving watchlist", details: error.message });
      }
  
      res.status(200).json({ message: "Watchlist saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error saving watchlist", details: error.message });
    }
  };

  module.exports = {
    getWatchlist,
    saveWatchlist
  }