const router = require('express').Router();
const meta = require('app/api/meta');
const entities = require('app/api/entities');
const objects = require('app/api/objects');

router.use('/meta', meta);
router.use('/entities', entities);
router.use('/objects', objects);

module.exports = router;
