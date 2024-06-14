<?php
 
namespace App\Controllers;
 
use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use \Firebase\JWT\JWT;
 
class Login extends BaseController
{
    use ResponseTrait;
     
    public function index()
    {
        $userModel = new UserModel();
  
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $invalidCredentialsMessage = 'Credenciais inválidas';
          
        $user = $userModel->where('email', $email)->first();

        if(is_null($user)) {
            return $this->respond(['message' => $invalidCredentialsMessage], 401);
        }
  
        $isPasswordValid = password_verify($password, $user['password']);

        if(!$isPasswordValid) {
            return $this->respond(['message' => $invalidCredentialsMessage], 401);
        }
 
        $secretKey = "asdknasdkjnaskjdakjsdnkajsd33";
        $iat = time(); 
        $exp = $iat + 60 * 60 * 24 * 7; // 7 days
 
        $payload = array(
            "sub" => $user['id'],
            "iat" => $iat, 
            "exp" => $exp, 
        );
         
        $token = JWT::encode($payload, $secretKey, 'HS256');
 
        $response = [
            'token' => $token
        ];
         
        return $this->respond($response, 200);
    }
 
}
