<?php

namespace App\Controllers;

use App\Models\BookingModel;
use App\Models\ParkingModel;
use App\Models\ParkingSpaceModel;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class ParkCar extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $rules = [
            'space_id' => ['rules' => 'required|integer'],
            'car_plate' => ['rules' => 'required|min_length[4]|max_length[12]'],
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

        $parkingModel = new ParkingModel();

        $parking = $parkingModel->find($user['parking_id']);

        $parkingSpaceModel = new ParkingSpaceModel();

        $parkingSpace = $parkingSpaceModel->find($this->request->getVar('space_id'));

        if (!$parkingSpace) {
            return $this->fail(['message' => 'Vaga não encontrada'] , 404);
        }

        if ($parkingSpace['parking_id'] != $parking['id']) {
            return $this->fail(['message' => 'Vaga inválida'] , 400);
        }

        if ($parkingSpace['is_filled'] == '1') {
            return $this->fail(['message' => 'Esta vaga já está ocupada'] , 400);
        }

        $bookingModel = new BookingModel();

        $bookingData = [
            'car_plate' => $this->request->getVar('car_plate'),
            'parking_id' => $parking['id'],
            'space_id' => $parkingSpace['id'],
            'cost_per_hour_in_cents' => $parking['cost_per_hour_in_cents'],
            'started_at' => date("Y-m-d H:i:s"),
        ];

        $parkingSpaceData = [
            'is_filled' => 1,
        ];

        try {
            $bookingModel->save($bookingData);
            $parkingSpaceModel->update($parkingSpace['id'], $parkingSpaceData);

            return $this->respondCreated();
        } catch (\Throwable $th) {
            return $this->respond(['message' => 'Falha ao criar reserva'], 400);
        }
    }
}
