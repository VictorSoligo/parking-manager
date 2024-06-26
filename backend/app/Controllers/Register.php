<?php
 
namespace App\Controllers;
 
use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
 
class Register extends BaseController
{
    use ResponseTrait;
 
    public function handle()
    {
        $rules = [
            'email' => ['rules' => 'required|min_length[4]|max_length[255]|valid_email'],
            'password' => ['rules' => 'required|min_length[8]|max_length[255]'],
            'name' => ['rules' => 'required|min_length[4]|max_length[255]'],
            'role' => ['rules' => 'required|in_list[admin,manager]'],
        ];
        
        $isValidationSuccess = $this->validate($rules);

        if (!$isValidationSuccess) {
            $response = [
                'errors' => $this->validator->getErrors(),
                'message' => 'Invalid inputs'
            ];

            return $this->fail($response , 400);
        }
  
        $userModel = new UserModel();

        $userWithSameEmail = $userModel->where('email', $this->request->getVar('email'))->first();

        if ($userWithSameEmail) {
            $response = [
                'message' => 'Email já cadastrado'
            ];

            return $this->fail($response , 400);
        }

        $data = [
            'email'    => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
            'name'     => $this->request->getVar('name'),
            'role'     => $this->request->getVar('role'),
        ];

        $userModel->save($data);
            
        return $this->respondCreated();
    }
}