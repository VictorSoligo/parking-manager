<?php
 
namespace App\Filters;
 
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
 
class EnsureAdminFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $jwtSecret = "asdknasdkjnaskjdakjsdnkajsd33";
        $badRequestBody = "{\"message\": \"Você não tem permissão\"}";

        $athorizationHeader = $request->getHeaderLine("Authorization");
        $token = explode(" ", $athorizationHeader)[1];
  
        try {
            $rawPayload = JWT::decode($token, new Key($jwtSecret, 'HS256'));

            $payload = (array) $rawPayload;

            if ($payload['role'] !== 'admin') {
              $response = service('response');
              $response->setStatusCode(403);
              $response->setBody($badRequestBody);

              return $response;
            }
        } catch (\Throwable $th) {
            $response = service('response');
            $response->setStatusCode(401);
            $response->setBody($badRequestBody);

            return $response;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {}
}