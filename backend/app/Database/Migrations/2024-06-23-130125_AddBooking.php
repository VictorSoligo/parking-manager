<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddBooking extends Migration
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
            'started_at' => [
                'type' => 'DATETIME',
                'null' => false
            ],
            'ended_at' => [
                'type' => 'DATETIME',
                'null' => true,
                'default' => null,
            ],
            'car_plate' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => false,
            ],
            'parking_id' => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            'space_id' => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => false,
            ],
            'cost_per_hour_in_cents' => [
                'type' => 'INT',
                'constraint' => 255,
                'unsigned' => true,
                'null' => false
            ],
            'cost_in_cents' => [
                'type' => 'INT',
                'unsigned' => true,
                'null' => true,
                'default' => null,
            ],
            'is_finished' => [
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
        $this->forge->addForeignKey('space_id', 'parking_spaces', 'id');
        $this->forge->createTable('bookings');
    }

    public function down()
    {
        $this->forge->dropTable('bookings');
    }
}
