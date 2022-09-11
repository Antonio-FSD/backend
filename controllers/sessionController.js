const Session = require('../models/sessionModel.js');

const sessionController = {
    
    getSessionsList: async (req, res) => {
        const sessions = await Session.find();
        res.json(sessions);
    },

    getSession: async (req, res) => {
        const id = req.params.id;
        const sessionFound = await Session.findOne({id});

        if (!sessionFound) return res.status(500).json({
            error: 'SessionNotFound'
        });

        res.json(sessionFound);
    },

    addSession: async (req, res) => {
       const { seats, session, movie_id } = req.body;

       const SessionFound = await Session.findOne({session, movie_id});

       if (SessionFound) return res.status(500).json({
           error: 'ExistingSession'
       }); 

       const newSession = new Session();

       newSession.seats = seats;
       newSession.session = session;
       newSession.movie_id = movie_id;

       newSession.save( (err, savedInfo) => {
           if(err) {
               console.log('Error', err);
           }
           res.json({message: `Session added: ${title}`});
       })
   }

}

module.exports = sessionController;