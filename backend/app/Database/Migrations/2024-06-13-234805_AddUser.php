<?php
  
namespace App\Database\Migrations;
  
use CodeIgniter\Database\Migration;
  
class AddUser extends Migration
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
            'email' => [
                'type' => 'VARCHAR',
                'unique' => true,
                'constraint' => '255',
            ],
            'password' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'role' => [
                'type' => "ENUM('admin','manager')",
                'default' => 'manager',
                'null' => false,
            ],
            'parking_id' => [
                'type' => 'INT',
                'unsigned' => true,
                'default' => null,
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
        $this->forge->createTable('users');
    }
  
    public function down()
    {
        $this->forge->dropTable('users');
    }
}