const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exception/InvariantError');
const NotFoundError = require('../exception/NotFoundError');
const AuthorizationError = require('../exception/AuthorizationError')

class FoodService{
    constructor(){
        this._pool = new Pool()
    }

    async addFood({name , price , shops_id , owner}){
        const id = "food-" + nanoid(16);

        const createdAt = new Date().toISOString()
        const insertAt = createdAt;

        const query = {
            text: 'INSERT INTO foods VALUES($1, $2, $3 , $4 , $5 , $6 , $7) RETURNING id',
            values: [id, name , price , createdAt , insertAt , shops_id , owner],
        };

        const result = await this._pool.query(query)

        if (!result.rows[0].id) {
            throw new InvariantError('Food failed added')
        }
        return result.rows[0].id;

    }

    async getFood(owner){
        const query = {
            text: `SELECT  
            f.name , f.price FROM shops s 
            INNER JOIN foods f ON s.id = f.shops_id 
            WHERE s.owner = $1 `,
            values: [owner],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Food tidak ditemukan');
        }
        return result.rows.map(food => ({name : food.name , price : food.price})) 
    }

    async updateFood(id , {name , price}){
        const updatedAt = new Date().toISOString();
        if (name == null){
            const query = {
                text: 'UPDATE foods SET price = $1, updated_at = $2 WHERE id = $3 RETURNING id',
                values: [price, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else if (price == null){
            const query = {
                text: 'UPDATE foods SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id',
                values: [name, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }else{
            const query = {
                text: 'UPDATE foods SET name = $1, price = $2 , updated_at = $3 WHERE id = $4 RETURNING id',
                values: [name,price, updatedAt, id],
            };
            const result = await this._pool.query(query);

            if (!result.rows.length) {
                throw new NotFoundError('Gagal memperbarui shops. Id tidak ditemukan');
            }
        }
    }

    async deleteFood(id){
        const query = {
            text: 'DELETE FROM foods WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('food gagal dihapus. Id tidak ditemukan');
        }
    }


}

module.exports = FoodService