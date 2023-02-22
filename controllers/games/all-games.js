const router = require('express').Router();
const { Games, User } = require('../../models');

// you are here: /games
router.get('/', async (req, res) => {
  let loginStatus = req.session.loggedIn;
  let loggedInUser = req.session.username;

  try {
    const dbGamesData = await Games.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const games = dbGamesData.map((game) => ({
      title: game.title,
      description: game.description,
      game_image: game.game_image,
      user: game.user.username,
      timestamp: game.timestamp,
    }));

    console.log(JSON.stringify(games, null, 2));

    res.render('all-games', {
      games,
      loginStatus,
      loggedInUser,
    });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
