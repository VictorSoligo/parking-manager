<?php

namespace App\Controllers;

use App\Models\BookingModel;
use App\Models\ParkingSpaceModel;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use DateTime;

class ExitCar extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $rules = [
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

        $bookingModel = new BookingModel();

        $bookings = $bookingModel->where('car_plate', $this->request->getVar('car_plate'))->where('ended_at', null)->findAll();

        if (count($bookings) != 1) {
            return $this->fail(['message' => 'Reserva não encontrada'] , 404);
        }

        $booking = $bookings[0];

        if ($booking['parking_id'] != $user['parking_id']) {
            return $this->fail(['message' => 'Reserva inválida'] , 400);
        }

        $startedAt = $booking['started_at'];
        $endedAt = date("Y-m-d H:i:s");

        $parkingPeriodInSeconds = strtotime($endedAt) - strtotime($startedAt);

        $parkingSpaceModel = new ParkingSpaceModel();

        $bookingData = [
            'ended_at' => $endedAt,
            'cost_in_cents' => 0,
        ];

        $parkingSpaceData = [
            'is_filled' => 0,
        ];

        try {
            $bookingModel->update($booking['id'], $bookingData);
            $parkingSpaceModel->update($booking['space_id'], $parkingSpaceData);

            return $this->respondNoContent();
        } catch (\Throwable $th) {
            return $this->respond(['message' => 'Falha ao criar reserva'], 400);
        }
    }
}
