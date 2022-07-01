const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('../api/GateKeepingMiddleWare');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.authenticate({ email, password });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      // secure: true,
      // secure is disabled for development
      signed: true,
    });
    res.send('User has logged in successfully');
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    const user = await User.create({ email, password, first_name, last_name });

    const token = await user.generateToken();

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      // secure: true,
      // secure is disabled for development
      signed: true,
    });

    res.send('User is signed up');
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);
    } else {
      res.sendStatus(404);
    }
  } catch (ex) {
    next(ex);
  }
});

router.delete('/', requireToken, async (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    signed: true,
  });
  res.send();
});
