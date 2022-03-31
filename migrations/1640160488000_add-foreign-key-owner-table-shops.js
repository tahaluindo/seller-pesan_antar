/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addConstraint('shops', 'fk_shops.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('shops', 'fk_shops.owner_users.id');
};
