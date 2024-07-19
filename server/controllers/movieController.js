// module.exports = {
//     getMovies: async (req, res) => {
//         const page = req.query.page || 1;
//         const apiKey = process.env.REACT_APP_API_KEY;

//         try {
//             const response = await axios.get(
//                 `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
//             );
//             res.json(response.data)
//         } catch (error) {
//             res.status(500).json({ error: error.message})
//         }
//     }
// }