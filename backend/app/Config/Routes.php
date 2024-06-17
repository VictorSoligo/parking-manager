<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::handle');

$routes->group('users', function ($routes) {
  $routes->post('', 'Register::handle', ['filter' => 'admin']);
  $routes->post('sessions', 'Login::handle');
});
