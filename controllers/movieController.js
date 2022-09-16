const Movie = require('../models/movieModel.js');

const movieController = {
    
    getMoviesList: async (req, res) => {
        const movies = await Movie.find();
        res.json(movies);
    },

    getMovie: async (req, res) => {
        const  movieId  = req.params.id;
        // Se comprueba si es un object id (longitud de 24 caracteres)
        if (movieId.length != 24) {
            return res.status(500).json({ error: 'movieId not valid (length =24 char).' });
        };
        // Comprobamos si existe el producto.
        const movieFound = await Movie.findOne({ _id : movieId});
        if (!movieFound){
            return res.status(500).json({ error: 'Product not found' });
        };
        res.json(movieFound);
    },

    addMovie: async (req, res) => {
       const { title, cover, director, genre, synopsis, trailer } = req.body;
       console.log('Añadir nueva película:', title);

       const MovieFound = await Movie.findOne({title})
       if (MovieFound) return res.status(500).json({
           error: 'MovieUsed'
       }); 

       const newMovie = new Movie();

       newMovie.title = title;
       newMovie.cover = cover;
       newMovie.director = director;
       newMovie.genre = genre;
       newMovie.synopsis = synopsis;
       newMovie.trailer = trailer;

       newMovie.save( (err, savedInfo) => {
           if(err) {
               console.log('Error', err);
           }
           res.json({message: `Movie added: ${title}`});
       })
    },

    getMovieByGenre: async (req, res) => {
        const genreId  = req.params.id;
       
        const moviesFound = await Movie.find({ genre: genreId });
        if (!moviesFound) return res.status(500).json({
            error: 'Movie not found by this genre'
        }); 
        res.json(moviesFound);
    },

    searchMovie: async (req, res) => {
        const title = req.params.name;
        console.log("search name:", title);
        const findreg = new RegExp(title, 'gi');

        const moviesFound = await Movie.find({ $or:[{ title: findreg }, { director: findreg }, { synopsis: findreg }] });
        if (!moviesFound.length) return res.status(200).json({
            error: 'MovieNotFound'
        }); 
        res.json(moviesFound);
    },

}

module.exports = movieController;