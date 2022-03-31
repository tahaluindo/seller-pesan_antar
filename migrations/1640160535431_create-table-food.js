/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('foods', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        name: {
          type: 'TEXT',
          notNull: true,
        },
        price: {
          type: 'INT',
          notNull: true,
        },
        
        created_at: {
          type: 'TEXT',
          notNull: true,
        },
        updated_at: {
          type: 'TEXT',
          notNull: true,
        },
        shops_id : {
            type: 'VARCHAR(50)',
        },
        owner: {
            type: 'VARCHAR(50)',
          },

      });

      pgm.addConstraint('foods', 'fk_foods.shops_id_shops.id', 'FOREIGN KEY(shops_id) REFERENCES shops(id) ON DELETE CASCADE');
      pgm.addConstraint('foods', 'fk_foods.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');

};

exports.down = pgm => {
    pgm.dropTable('shops');
    pgm.dropConstraint('foods', 'fk_foods.shops_id_shops.id');
    pgm.dropConstraint('fppds', 'fk_foods.owner_users.id');
};
