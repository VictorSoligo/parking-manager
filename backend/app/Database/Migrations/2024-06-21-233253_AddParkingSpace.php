<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddParkingSpace extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 255,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'identification' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'parking_id' => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            'is_filled' => [
                'type' => 'TINYINT',
                'null' => false,
                'default' => 0,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true
            ],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('parking_id', 'parkings', 'id');
        $this->forge->createTable('parking_spaces');
    }

    public function down()
    {
        $this->forge->dropTable('parking_spaces');
    }
}
