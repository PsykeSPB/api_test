const router = require('express').Router();
const Op = require('sequelize').Op;
const { Meta, Object } = require('app/sequelize').models;

router.route('/')
  .get((req, res) => {

    const where = {};

    if (req.query.title) {
      where.title = {
        [Op.iLike]: `%${req.query.title}%`,
      };
    }

    if (req.query.description) {
      where.description = {
        [Op.iLike]: `%${req.query.description}%`,
      };
    }

    Meta.findAll({ where: where })
      .then(meta => {
        res.json(meta);
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .post((req, res) => {
    Meta.create({
      title: req.body.title,
      description: req.body.description,
    })
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      })
  });

router.param('meta_id', (req, res, next, id) => {
  Meta.findByPk(id)
    .then(meta => {
      req.meta = meta;
      next();
    })
    .catch(error => {
      // Exception analysis here
      res.status(404).json(error);
    });
});

router.route('/:meta_id')
  .get((req, res) => {
    res.json(req.meta);
  })
  .put((req, res) => {
    req.meta.update(req.body)
      .then(() => {
        res.status(204).send('ok');
      })
      .else(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.meta.destroy
      .then(() => {
        res.status(204).send('ok')
      })
      .catch((error) => {
        // Exception analysis here
        res.status(400).json(error);
      });
  });

router.route('/:meta_id/object')
  .get((req, res) => {
    req.meta.getObject()
      .then(object => {
        res.json(object);
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.meta.setObject(null)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error)
      });
  });

router.param('object_id', (req, res, next, id) => {
  Object.findByPk(id)
    .then(object => {
      req.object = object;
      next();
    })
    .catch(error => {
      // Exception analysis here
      res.status(404).json(error);
    });
});

router.put('/:meta_id/object/:object_id', (req, res) => {
  req.meta.setObject(req.object)
    .then(() => {
      res.status(204).send('ok');
    })
    .catch(error => {
      // Exception analysis here
      res.status(400).json(error);
    });
});

module.exports = router;
