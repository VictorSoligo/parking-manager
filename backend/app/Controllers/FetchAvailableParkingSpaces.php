<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ParkingSpaceModel;
use App\Models\UserModel;

class FetchAvailableParkingSpaces extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $userModel = new UserModel();

        $user = $userModel->find($this->request->sub);

        if (!$user['parking_id']) {
            return $this->fail(['message' => 'Usuário não possui um estacionamento'] , 400);
        }

        $parkingSpaceModel = new ParkingSpaceModel();

        $parkingSpaces = $parkingSpaceModel->where('parking_id', $user['parking_id'])->where('is_filled', 0)->findAll();

        return $this->respond($parkingSpaces);
    }
}
