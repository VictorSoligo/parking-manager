<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class EditUser extends BaseController
{
    use ResponseTrait;

    public function handle($userId)
    {
        $rules = [
            'email' => ['rules' => 'required|min_length[4]|max_length[255]|valid_email'],
            'name' => ['rules' => 'required|min_length[4]|max_length[255]'],
            'parking_id' => ['rules' => 'required|integer']
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

        $data = [
            'email'      => $this->request->getVar('email'),
            'name'       => $this->request->getVar('name'),
            'parking_id' => $this->request->getVar('parking_id'),
        ];

        try {
            $userModel->update($userId, $data);
        } catch (\Throwable $th) {
            return $this->fail(['message' => "Estacionamento não encontrado"], 404);
        }

        return $this->respondNoContent();
    }
}
