const FoodsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'drink',
  version: '1.0.0',
  register: async (server, { service_shop, service_drink  , validator }) => {
    const foodHandler = new FoodsHandler(service_shop, service_drink , validator) ;
    server.route(routes(foodHandler));
  },
};