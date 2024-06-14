<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('/users/sessions', 'Login::index');
$routes->post('/users', 'Register::index', ['filter' => 'authFilter']);
