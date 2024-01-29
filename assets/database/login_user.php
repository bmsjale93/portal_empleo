<?php
include 'db.php'; // Incluir el archivo de conexión a la base de datos

$email = $_POST['email']; // Obtener el correo electrónico enviado desde el formulario
$password = $_POST['password']; // Obtener la contraseña enviada desde el formulario

// Preparar y ejecutar la consulta SQL
$sql = "SELECT * FROM Usuarios WHERE Email = ? AND Contraseña = ?"; // Utilizar sentencias preparadas para evitar inyecciones SQL
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password); // 'ss' significa que ambos parámetros son strings
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Credenciales correctas, usuario encontrado
    $user = $result->fetch_assoc();
    echo "Bienvenido " . $user['Nombre'];
    // Aquí podrías establecer variables de sesión, redirigir a otra página, etc.
} else {
    echo "Usuario o contraseña incorrectos";
}

$conn->close();
