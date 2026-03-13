<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\AppSetting;

class AppSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $setting = new AppSetting();
        $setting->companyName = 'QUICK CRM';
        $setting->dashboardType = 'inventory';
        $setting->tagLine = 'Managing Tool';
        $setting->address = 'H.O.-E-1074 Ramphal Chowk Dwarka Sector-7,New Delh-110077';
        $setting->phone = '+91 8826400137';
        $setting->email = '';
        $setting->website = 'https://quickerptechnologies.com/';
        $setting->footer = 'Quick CRM copyright 2026';
        $setting->logo = null;
        $setting->currencyId = 3;

        $setting->save();
    }
}
