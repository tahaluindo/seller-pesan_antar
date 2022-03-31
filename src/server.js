require('dotenv').config().config

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')




// authentications
const authentications = require('./api/authentications')
const AuthenticationsService = require('./services/AuthenticationService')
const TokenManager = require('./tokenize/TokenManager')
const AuthenticationsValidator = require('./validator/authentications');


// users
const users = require('./api/users')
const UserService = require('./services/UsersService')
const UsersValidator = require('./validator/user')


//shop
//Shops
const shops = require('./api/shop')
const ShopsService = require('./services/ShopsService')
const ShopValidator = require('./validator/shops')


//food
const foods = require('./api/foods')
const FoodService = require('./services/FoodService')
const FoodValidator = require('./validator/food')


//drink
const drink = require('./api/drinks')
const DrinkService = require('./services/DrinksService')
const DrinkValidator = require('./validator/drink')

const init = async () => {
    
    const userService = new UserService();
    const shopsService = new ShopsService()
    const foodService = new FoodService()
    const drinkService = new DrinkService()
    const authenticationsService = new AuthenticationsService();
    
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    
    })
    
    await server.register([
        {
            plugin: Jwt
        }
    ])

    server.auth.strategy('pesan_antar_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    })


    await server.register([
      
        {
            plugin: shops,
            options: {
                service : shopsService,
                validator: ShopValidator
            }
        },
        {
            plugin: foods,
            options: {
                service_shop: shopsService,
                service_food: foodService,
                validator: FoodValidator
            }
        },
        {
            plugin: drink,
            options: {
                service_shop: shopsService,
                service_drink: drinkService,
                validator: DrinkValidator
            }
        },
        {
            plugin: users,
            options: {
                service : userService,
                validator: UsersValidator
            }
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService : userService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },


    ]);
    
    
    return server;
};


const start = async () => {
    let server;
    server = await init();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


init();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 };
async function begin() {
    await sleep(300);
    start();    
}
begin();

module.exports = init