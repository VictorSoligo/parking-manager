<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class FetchUsers extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $db = \Config\Database::connect();

        $builder = $db->table('users');
        $builder->select('id, name, email, role, parking_id, created_at, updated_at');

        $users = $builder->get()->getResultArray();

        return $this->respond($users);
    }
}
