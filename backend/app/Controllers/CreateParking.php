<?php

namespace App\Controllers;

use App\Models\ParkingModel;
use CodeIgniter\API\ResponseTrait;

class CreateParking extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $rules = [
            'name' => ['rules' => 'required|min_length[4]|max_length[255]'],
        ];
        
        $isValidationSuccess = $this->validate($rules);

        if (!$isValidationSuccess) {
            $response = [
                'errors' => $this->validator->getErrors(),
                'message' => 'Invalid inputs'
            ];

            return $this->fail($response , 400);
        }

        $parkingModel = new ParkingModel();

        $parkingWithSameName = $parkingModel->where('name', $this->request->getVar('name'))->first();

        if ($parkingWithSameName) {
            $response = [
                'message' => 'Estacionamento já cadastrado'
            ];

            return $this->fail($response , 400);
        }

        $data = [
            'name' => $this->request->getVar('name'),
            'cost_per_hour_in_cents' => 0,
        ];

        $parkingModel->save($data);

        return $this->respondCreated();
    }
}
