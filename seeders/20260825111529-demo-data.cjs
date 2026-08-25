'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Users', [
      { name: 'Jeffrey Siat', email: 'jeffrey@itelect2.test', createdAt: now, updatedAt: now },
      { name: 'Maria Santos', email: 'maria@itelect2.test', createdAt: now, updatedAt: now },
      { name: 'John Cruz', email: 'john@itelect2.test', createdAt: now, updatedAt: now },
    ]);

    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idOf = (name) => users.find((u) => u.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Set up Express server', dueDate: '2026-08-01', completed: true,
        userId: idOf('Jeffrey Siat'), createdAt: now, updatedAt: now },
      { title: 'Write GT8 routes', dueDate: '2026-08-25', completed: false,
        userId: idOf('Jeffrey Siat'), createdAt: now, updatedAt: now },
      { title: 'Review Postman collection', dueDate: '2026-08-26', completed: false,
        userId: idOf('Maria Santos'), createdAt: now, updatedAt: now },
      { title: 'Update README screenshots', dueDate: '2026-08-26', completed: false,
        userId: idOf('Maria Santos'), createdAt: now, updatedAt: now },
      { title: 'Submit midterm project', dueDate: '2026-08-26', completed: false,
        userId: idOf('John Cruz'), createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};