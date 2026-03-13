<?php

use App\Http\Controllers\Crm\Task\CrmTaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('permission:create-projectTask')->post("/", [CrmTaskController::class, 'createTask']);

Route::middleware('permission:readAll-projectTask')->get("/", [CrmTaskController::class, 'getAllTask']);

Route::middleware('permission:readSingle-projectTask')->get("/{id}", [CrmTaskController::class, 'getSingleTask']);

Route::middleware('permission:update-projectTask')->put("/{id}", [CrmTaskController::class, 'updateTask']);

Route::middleware('permission:delete-projectTask')->patch("/{id}", [CrmTaskController::class, 'deleteTask']);
