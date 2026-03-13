<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //get all permissions
        $permissions = Permission::all();

        //create rolePermission for role id 1
        for ($i = 1; $i <= count($permissions); $i++) {
            $roleId = 1;
            $permissionId = $i;

            // Assuming you have a model for rolePermission with proper relationships
            $rolePermission = new RolePermission();
            $rolePermission->role()->associate($roleId);
            $rolePermission->permission()->associate($permissionId);
            $rolePermission->save();
        }

        //TODO:: need to remove after testing
        //create rolePermission for role id 1
        for ($i = 1; $i <= count($permissions); $i++) {
            $roleId = 2;
            $permissionId = $i;

            // Assuming you have a model for rolePermission with proper relationships
            $rolePermission = new RolePermission();
            $rolePermission->role()->associate($roleId);
            $rolePermission->permission()->associate($permissionId);
            $rolePermission->save();
        }
        //create rolePermission for role id 3
        $customer =
        [
            1, 2, 3, 4, 5, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 237
        ];

        for ($i = 0; $i < count($customer); $i++) {
            $roleId = 3;
            $permissionId = $customer[$i];

            // Assuming you have a model for rolePermission with proper relationships
            $rolePermission = new RolePermission();
            $rolePermission->role()->associate($roleId);
            $rolePermission->permission()->associate($permissionId);
            $rolePermission->save();
        }

        //get all role id
        $roles = Role::all();
        $permissionId = Permission::where('name', 'readSingle-rolePermission')->first()->id;

        //role id 1 is skip
        for ($i = 2; $i <= count($roles); $i++) {
            $rolePermission = new RolePermission();
            $rolePermission->roleId = $i;
            $rolePermission->permissionId = $permissionId;
            $rolePermission->save();
        }
    }
}
