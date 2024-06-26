<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'name' => 'Vitao',
            'role' => 'admin',
            'email' => 'vitao@gmail.com',
            'password' => '$2y$10$z0TlOr.kEtzVlDjQhyxlUOQqWsUAZR4/845lyi4/Vak46FauYs5VK',
            'created_at' => '2024-06-20 22:51:38',
            'updated_at' => '2024-06-20 22:51:38',
        ];

        $this->db->table('users')->insert($data);
    }
}
