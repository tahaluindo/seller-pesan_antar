const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exception/InvariantError');
const NotFoundError = require('../exception/NotFoundError');
const AuthorizationError = require('../exception/AuthorizationError')
class ShopsService {
    constructor() {
        this._pool = new Pool()
    }

    async addShop({ name, address, no_phone, owner }) {
        const queryToCheckOwner = {
            text: 'SELECT * FROM shops WHERE owner = $1',
            values: [owner]
        }
        const resultCheckOwner = await this._pool.query(queryToCheckOwner)

        if (resultCheckOwner.rows.length > 0) {
            throw new InvariantError('Toko Telah Ada')
        }

        const id = "shop-" + nanoid(16);

        const createdAt = new Date().toISOString()
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO shops VALUES($1, $2, $3, $4, $5, $6 , $7) RETURNING id',
            values: [id, name, address, no_phone, createdAt, updatedAt, owner],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Toko gagal ditambahkan');
        }

        return result.rows[0].id;
    }
    async getShops(owner) {
        const query = {
            text: 'SELECT * FROM shops WHERE owner = $1',
            values: [owner]
        }
        const result = await this._pool.query(query)
        return result.rows.map(shop => ({ id: shop.id, name: shop.name, no_phone: shop.no_phone, foods: JSON.parse(JSON.stringify(shop.foods)), drinks: shop.drinks, owner: shop.owner }))
    }
    async getShopById(owner) {
        console.log(owner)
        const query = {
            text: `SELECT *  FROM shops 
            WHERE owner = $1 `,
            values: [owner],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Toko tidak ditemukan');
        }

        return result.rows.map(shop => ({ id: shop.id, name: shop.name, no_phone: shop.no_phone, owner: shop.owner }))
    }

    async editShosById(id, { name, address, no_phone }) {
        const updatedAt = new Date().toISOString();
        if (name == null && address == null) {
            const query = {
                text: 'UPDATE shops SET no_phone = $1, updated_at = $2 WHERE id = $3 RETURNING id',
                values: [no_phone, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else if (name == null && no_phone == null){
            const query = {
                text: 'UPDATE shops SET address = $1, updated_at = $2 WHERE id = $3 RETURNING id',
                values: [address, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else if (no_phone == null && address == null){
            const query = {
                text: 'UPDATE shops SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id',
                values: [name, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else if (name == null){
            const query = {
                text: 'UPDATE shops SET address = $1, no_phone = $2 ,  updated_at = $3 WHERE id = $4 RETURNING id',
                values: [address , no_phone, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else if (address == null){
            const query = {
                text: 'UPDATE shops SET name = $1, no_phone = $2 ,  updated_at = $3 WHERE id = $4 RETURNING id',
                values: [name , no_phone, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else if (no_phone == null){
            const query = {
                text: 'UPDATE shops SET name = $1, address = $2 ,  updated_at = $3 WHERE id = $4 RETURNING id',
                values: [name , address, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }
    
    }

    async deleteShopById(id) {
        const query = {
            text: 'DELETE FROM shops WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('toko gagal dihapus. Id tidak ditemukan');
        }
    }
    async verifyShopOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM shops WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('TOKO tidak ditemukan');
        }
        const note = result.rows[0];
        if (note.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }
    
}

module.exports = ShopsService