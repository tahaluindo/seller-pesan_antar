const routes = (handler) => [
    {
      method: 'POST',
      path: '/shops/food/{id}',
      handler: handler.postFoodHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'GET',
      path: '/shops/food/{id}',
      handler: handler.getFoodsHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'PUT',
      path: '/shops/food/{id}',
      handler: handler.putShopHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/shops/food/{id}',
      handler: handler.deleteFoodHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
  ];
  
  module.exports = routes;