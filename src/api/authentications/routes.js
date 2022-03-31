const routes = (handler) => [
    {
      method: 'POST',
      path: '/shops/authentications',
      handler: handler.postAuthenticationHandler,
    },
    {
      method: 'PUT',
      path: '/shops/authentications',
      handler: handler.putAuthenticationHandler,
    },
    {
      method: 'DELETE',
      path: '/shops/authentications',
      handler: handler.deleteAuthenticationHandler,
    },
  ];
  
  module.exports = routes;