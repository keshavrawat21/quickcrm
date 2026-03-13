<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class customerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pass = "12345678";
        $password = Hash::make($pass);
        $customer = new Customer();
        $customer->roleId = 3;
        $customer->username = 'Walk-in Customer';
        $customer->email = 'example@gmail.com';
        $customer->password = $password;
        $customer->phone = '+91';
        $customer->address = 'Delhi, India';
        $customer->save();
    }
}
