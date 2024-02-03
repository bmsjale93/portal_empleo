<?php
include 'db.php'; // Incluir el archivo de conexión a la base de datos
session_start();

$email = $_POST['email'];
$password = $_POST['password'];

// Preparar y ejecutar la consulta SQL
$sql = "SELECT * FROM Usuarios WHERE Email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    // Verificar la contraseña
    if (password_verify($password, $user['Password'])) {
        $_SESSION['nombreUsuario'] = $user['Nombre'];
        echo json_encode(['success' => true, 'userName' => $user['Nombre']]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo "Usuario o contraseña incorrectos";
}

$conn->close();
