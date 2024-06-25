<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class GetUserProfile extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $userId = $this->request->sub;

        $db = \Config\Database::connect();

        $builder = $db->table('users');
        $builder->select('id, name, email, role, parking_id, created_at, updated_at');
        $builder->where('id', $userId);

        $user = $builder->get()->getResultArray()[0];

        return $this->respond($user);
    }
}
