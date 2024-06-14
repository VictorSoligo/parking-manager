<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::handle');

$routes->group('users', function ($routes) {
  $routes->post('', 'Register::handle');
  $routes->post('sessions', 'Login::handle');
});

// ['filter' => 'authFilter']
