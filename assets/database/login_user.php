<?php
include 'db.php'; // Incluir el archivo de conexión a la base de datos
session_start();

// Verificar que el método de la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json'); // Especificar el tipo de contenido

    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    if (!$email || !$password) {
        // Datos insuficientes para procesar la solicitud
        echo json_encode(['success' => false, 'message' => 'Datos insuficientes']);
        exit;
    }

    // Preparar y ejecutar la consulta SQL
    $sql = "SELECT * FROM Usuarios WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        // Manejar error en la preparación del statement
        echo json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta']);
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        // Verificar la contraseña
        if (password_verify($password, $user['Password'])) {
            // Login success
            $_SESSION['nombreUsuario'] = $user['Nombre'];
            echo json_encode(['success' => true, 'userName' => $user['Nombre']]);
        } else {
            // Contraseña incorrecta
            echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos']);
        }
    } else {
        // Usuario no encontrado
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos']);
    }

    $conn->close();
} else {
    // Método no permitido
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
