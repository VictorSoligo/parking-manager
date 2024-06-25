<?php

namespace App\Controllers;

use App\Models\ParkingModel;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class GetParking extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $userModel = new UserModel();

        $user = $userModel->find($this->request->sub);

        if (!$user['parking_id']) {
          return $this->fail(['message' => 'Usuário não possui um estacionamento'] , 400);
        }

        $parkingModel = new ParkingModel();

        $parking = $parkingModel->find($user['parking_id']);

        return $this->respond($parking);
    }
}
