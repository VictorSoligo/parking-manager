<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class Home extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $data = [
            'message' => 'Hello world',
        ];

        return $this->respond($data);
    }
}
