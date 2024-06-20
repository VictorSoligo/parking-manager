<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddParking extends Migration
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
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'cost_per_hour_in_cents' => [
                'type' => 'INT',
                'unsigned' => true,
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
        $this->forge->createTable('parkings');
    }

    public function down()
    {
        $this->forge->dropTable('parkings');
    }
}
