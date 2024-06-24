<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class FetchActiveBookings extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $userModel = new UserModel();

        $user = $userModel->find($this->request->sub);

        if (!$user['parking_id']) {
            return $this->fail(['message' => 'Usuário não possui um estacionamento'] , 400);
        }

        $db = \Config\Database::connect();

        $builder = $db->table('bookings');
        $builder->select('bookings.*, parking_spaces.identification AS space_identification');
        $builder->join('parking_spaces', 'bookings.space_id = parking_spaces.id');
        $builder->where('bookings.is_finished = 0');

        $bookings = $builder->get()->getResultArray();

        return $this->respond($bookings);
    }
}
