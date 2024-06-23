<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::handle');

$routes->group('users', function ($routes) {
  $routes->post('', 'Register::handle', ['filter' => 'admin']);
  $routes->get('', 'FetchUsers::handle', ['filter' => 'admin']);
  $routes->put('(:num)', 'EditUser::handle/$1', ['filter' => 'admin']);
  
  $routes->get('profile', 'GetUserProfile::handle');
  $routes->post('sessions', 'Login::handle');
});

$routes->group('parkings', function ($routes) {
  $routes->get('', 'FetchParkings::handle', ['filter' => 'admin']);
  $routes->post('', 'CreateParking::handle', ['filter' => 'admin']);
  $routes->put('(:num)', 'EditParking::handle/$1', ['filter' => 'admin']);
  
  $routes->post('spaces', 'CreateParkingSpace::handle');
  $routes->get('spaces', 'FetchParkingSpaces::handle');
  $routes->get('spaces/availables', 'FetchAvailableParkingSpaces::handle');

  $routes->post('bookings', 'ParkCar::handle');
});
