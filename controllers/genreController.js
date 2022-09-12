const Genre = require('../models/genreModel.js');

const genreController = {
    
    getAllGenres: async (req, res) => {
        const genres = await Genre.find();
        res.json(genres);
    },
    getGenre:  async (req, res) => {
        const { name } = req.body;
        const genreFound = await Genre.findOne({name})
        if (!genreFound) return res.status(500).json({
            error: 'GenreNotFound'
        }); 
        res.json(genreFound);
    },
    addGenre: async (req, res) => {
        const { name } = req.body;
        const genreFound = await Genre.findOne({name})
        if (genreFound) return res.status(500).json({
            error: 'GenreUsed'
        }); 

        const newGenre = new Genre();

        newGenre.name = name;

        newGenre.save( (err, savedInfo) => {
            if(err) {
                console.log('Error', err);
            }
            res.json({message: `Género añadido: ${name}`});
        })
    }
} 

module.exports = genreController;