const router = require('express').Router();
const Op = require('sequelize').Op;
const { Entity, Object } = require('app/sequelize').models;

router.route('/')
  .get((req, res) => {

    const where = {};

    if (req.query.name) {
      where.name = {
        [Op.iLike]: `%${req.query.name}%`,
      };
    }

    Entity.findAll({ where: where })
      .then(entity => {
        res.json(entity);
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .post((req, res) => {
    Entity.create({
      name: req.body.name,
    })
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      })
  });

router.param('entity_id', (req, res, next, id) => {
  Entity.findByPk(id)
    .then(entity => {
      req.entity = entity;
      next();
    })
    .catch(error => {
      // Exception analysis here
      res.status(404).json(error);
    });
});

router.route('/:entity_id')
  .get((req, res) => {
    res.json(req.entity);
  })
  .put((req, res) => {
    req.entity.update(req.body)
      .then(() => {
        res.status(204).send('ok');
      })
      .else(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.entity.destroy
      .then(() => {
        res.status(204).send('ok')
      })
      .catch((error) => {
        // Exception analysis here
        res.status(400).json(error);
      });
  });

router.route('/:entity_id/objects')
  .get((req, res) => {
    req.entity.getObjects()
      .then(object => {
        res.json(object);
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .post((req, res) => {
    req.entity.setObjects(req.body.objects)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.entity.setObjects([])
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })

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

router.route('/:entity_id/objects/:object_id')  
  .put((req, res) => {
    req.entity.addObject(req.object)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.entity.removeObjects(req.object)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  });

module.exports = router;
