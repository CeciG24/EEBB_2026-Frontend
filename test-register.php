<?php
// Test del API directamente sin frontend
require_once __DIR__ . '/EEBB_2026-Backend/vendor/autoload.php';
require_once __DIR__ . '/EEBB_2026-Backend/bootstrap/app.php';

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Datos de prueba
$testData = [
    'name' => 'Test User ' . time(),
    'email' => 'test' . time() . '@example.com',
    'password' => Hash::make('password123'),
    'institucion' => 'BUAP',
    'nivel' => 'universidad',
    'licenciatura' => 'Biotecnología',
    'semestre' => 6,
    'tipo_inscripcion' => 'asistente',
    'rol' => 'alumno',
];

try {
    echo "Intentando crear usuario...\n";
    $user = User::create($testData);
    echo "[OK] Usuario creado exitosamente!\n";
    echo "UID: " . $user->id . "\n";
    echo "Email: " . $user->email . "\n";
} catch (\Exception $e) {
    echo "[ERROR] " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
