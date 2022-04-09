import express from 'express';

const userRouter = express.Router();

// api/v1/user
userRouter.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  }
  return res.status(200).send(null);
});

export default userRouter;
