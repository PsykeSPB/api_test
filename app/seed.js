const sequelize = require('app/sequelize');
const { Meta, Object, Entity } = sequelize.models; 

(async () => {
  try {

    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const m1 = await Meta.create({
      title: 'Node opens new horizons!',
      description: 'Imagination is your only limit.'
    });

    const m2 = await Meta.create({
      title: 'Express is awesome!',
      description: 'While used with head.'
    });

    const m3 = await Meta.create({
      title: 'Sequelize helps!',
      description: 'To Save your time.',
    });

    const o1 = await Object.create({
      name: 'The one',
      slug: 'the_one',
      email: 'the_one@example.com',
    });

    const o2 = await Object.create({
      name: 'Two',
      slug: 'two',
      email: 'two@example.com',
    });

    const o3 = await Object.create({
      name: 'The III',
      slug: 'the_iii',
      email: 'three@example.com',
    });

    m1.setObject(o1);
    m2.setObject(o2);
    m3.setObject(o3);

    const e1 = await Entity.create({
      name: 'enty 1',
    });

    const e2 = await Entity.create({
      name: 'enty 2',
    });

    const e3 = await Entity.create({
      name: 'enty 3',
    });

    const e4 = await Entity.create({
      name: 'enty 4',
    });

    const e5 = await Entity.create({
      name: 'shared',
    });

    o1.addEntities([e1, e5]);
    o2.addEntities([e2, e3, e5]);
    o3.addEntities([e3, e4, e5]);
  
    console.log(`Data have been seeded successufuly.
    Turn services off by 'ctrl + c' command,
    Use 'docker-compose up' to start server.`);

  } catch (error) {
    console.error(error);
  }
})();
