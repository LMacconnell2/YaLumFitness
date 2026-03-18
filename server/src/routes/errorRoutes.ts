import express from 'express';

const router = express.Router();

router.get('/404',  req, res, err, asynce => {
    res.send(`Not Found: ${err}`);
});

router.get('/500', req, res, err, async => {
    res.send(`An internal server error has occurred: ${error}`);
});
