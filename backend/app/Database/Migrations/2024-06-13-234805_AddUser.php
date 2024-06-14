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
            'created_at DATETIME DEFAULT CURRENT_TIMESTAMP',
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true
            ],
        ]);
        
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('users');
    }
  
    public function down()
    {
        $this->forge->dropTable('users');
    }
}