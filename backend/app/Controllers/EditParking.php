<?php

namespace App\Controllers;

use App\Models\ParkingModel;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class EditParking extends BaseController
{
    use ResponseTrait;

    public function handle($parkingId)
    {
        $rules = [
            'name' => ['rules' => 'required|min_length[4]|max_length[255]'],
            'cost_per_hour_in_cents' => ['rules' => 'required|integer'],
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

        if ($user['role'] == 'manager' && $user['parking_id'] != $parkingId) {
            return $this->fail(['message' => 'Este estacionamento não é seu'] , 400);
        }

        $parkingModel = new ParkingModel();

        $data = [
            'name' => $this->request->getVar('name'),
            'cost_per_hour_in_cents' => $this->request->getVar('cost_per_hour_in_cents'),
        ];

        $parkingModel->update($parkingId, $data);

        return $this->respondNoContent();
    }
}
