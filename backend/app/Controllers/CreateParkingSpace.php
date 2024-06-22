<?php

namespace App\Controllers;

use App\Models\ParkingSpaceModel;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class CreateParkingSpace extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $rules = [
            'identification' => ['rules' => 'required|min_length[4]|max_length[255]'],
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

        $user = $userModel->find($this->request->sub);

        if (!$user['parking_id']) {
            return $this->fail(['message' => 'Usuário não possui um estacionamento'] , 400);
        }

        $parkingSpaceModel = new ParkingSpaceModel();

        $data = [
            'identification' => $this->request->getVar('identification'),
            'parking_id' => $user['parking_id'],
        ];

        $parkingSpaceModel->save($data);

        return $this->respondCreated();
    }
}
