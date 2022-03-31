const routes = (handler) => [
    {
      method: 'POST',
      path: '/shops/drink/{id}',
      handler: handler.postDrinkHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'GET',
      path: '/shops/drink/{id}',
      handler: handler.getDrinkHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'PUT',
      path: '/shops/drink/{id}',
      handler: handler.putDrinkHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/shops/drink/{id}',
      handler: handler.deleteDrinksHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
  ];
  
  module.exports = routes;