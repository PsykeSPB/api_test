const router = require('express').Router();
const Op = require('sequelize').Op;
const { Object, Meta, Entity } = require('app/sequelize').models;

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

router.route('/')
  .get((req, res) => {

    const where = {};

    if (req.query.name) {
      where.name = {
        [Op.iLike]: `%${req.query.name}%`,
      };
    }

    if (req.query.slug) {
      where.slug = {
        [Op.iLike]: `%${req.query.slug}%`,
      };
    }

    if (req.query.email) {
      where.email = {
        [Op.iLike]: `%${req.query.email}%`,
      };
    }

    Object.findAll({ where: where })
      .then(object => {
        res.json(object);
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .post((req, res) => {
    Object.create({
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
    })
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      })
  });

router.route('/:object_id')
  .get((req, res) => {
    res.json(req.object);
  })
  .put((req, res) => {
    req.object.update(req.body)
      .then(() => {
        res.status(204).send('ok');
      })
      .else(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.object.destroy
      .then(() => {
        res.status(204).send('ok')
      })
      .catch((error) => {
        // Exception analysis here
        res.status(400).json(error);
      });
  });

router.route('/:object_id/entities')
  .get((req, res) => {
    req.object.getEntities()
      .then(entities => {
        res.json(entities);
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .post((req, res) => {
    req.object.setEntities(req.body.entities)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.object.setEntities([])
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })

router.route('/:object_id/entities/:entity_id')  
  .put((req, res) => {
    req.object.addEntity(req.entity)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.object.removeEntities(req.entity)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  });

router.route('/:object_id/meta')
  .get((req, res) => {
    req.object.getMeta()
      .then(meta => {
        res.json(meta);
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    req.object.setMeta(null)
      .then(() => {
        res.status(204).send('ok');
      })
      .catch(error => {
        // Exception analysis here
        res.status(400).json(error)
      });
  });

router.put('/:object_id/meta/:meta_id', (req, res) => {
  req.object.setMeta(req.meta)
    .then(() => {
      res.status(204).send('ok');
    })
    .catch(error => {
      // Exception analysis here
      res.status(400).json(error);
    });
});

module.exports = router;
