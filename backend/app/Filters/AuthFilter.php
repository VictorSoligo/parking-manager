<?php
 
namespace App\Filters;
 
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
 
class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $jwtSecret = "asdknasdkjnaskjdakjsdnkajsd33";
        $badResponse = "Acesso negado";

        $athorizationHeader = $request->getHeaderLine("Authorization");

        if (!$athorizationHeader) {
            $response = service('response');
            $response->setBody($badResponse);
            $response->setStatusCode(401);
            
            return $response;
        }
  
        $token = explode(" ", $athorizationHeader)[1];
  
        if(!$token) {
            $response = service('response');
            $response->setBody($badResponse);
            $response->setStatusCode(401);

            return $response;
        }
  
        try {
            JWT::decode($token, new Key($jwtSecret, 'HS256'));
        } catch (\Throwable $th) {
            $response = service('response');
            $response->setBody($badResponse);
            $response->setStatusCode(401);

            return $response;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {}
}