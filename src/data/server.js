const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Utilisation des middlewares JSON-Server par défaut
server.use(middlewares);

// Ajouter un middleware pour exposer X-Total-Count
server.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

// Middleware pour ajouter X-Total-Count dans les requêtes paginées
server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.startsWith('/products')) {
    const totalItems = router.db.get('products').size().value();
    res.setHeader('X-Total-Count', totalItems);
  }
  next();
});

// Utiliser le routeur de JSON-Server
server.use(router);

// Démarrage du serveur
server.listen(9000, () => {
  console.log('JSON-Server is running on http://localhost:9000');
});
