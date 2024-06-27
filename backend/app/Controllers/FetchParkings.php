<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ParkingModel;

class FetchParkings extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $parkingModel = new ParkingModel();

        $parkings = $parkingModel->findAll();

        return $this->respond($parkings);
    }
}
