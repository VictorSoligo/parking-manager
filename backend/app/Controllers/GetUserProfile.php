<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class GetUserProfile extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $userId = $this->request->sub;

        $userModel = new UserModel();

        $user = $userModel->where('id', $userId)->first();

        return $this->respond($user);
    }
}
