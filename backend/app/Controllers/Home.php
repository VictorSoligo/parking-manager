<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class Home extends BaseController
{
    use ResponseTrait;

    public function handle()
    {
        $data = [
            'message' => 'ok',
        ];

        return $this->respond($data);
    }
}
