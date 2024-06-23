<?php

namespace App\Controllers;

use App\Models\BookingModel;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class FetchFinishedBookings extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $userModel = new UserModel();

        $user = $userModel->find($this->request->sub);

        if (!$user['parking_id']) {
            return $this->fail(['message' => 'Usuário não possui um estacionamento'] , 400);
        }

        $bookingModel = new BookingModel();

        $bookings = $bookingModel->where('parking_id', $user['parking_id'])->where('is_finished', 1)->orderBy('ended_at', 'desc')->findAll();

        return $this->respond($bookings);
    }
}
