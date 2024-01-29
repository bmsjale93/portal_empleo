<?php
include 'db.php'; // Incluir el archivo de conexión a la base de datos

$nombre = $_POST['nombre']; // Obtener el nombre del formulario
$email = $_POST['email']; // Obtener el correo electrónico del formulario
$password = $_POST['password']; // Obtener la contraseña del formulario

// Preparar y ejecutar la consulta SQL para insertar el nuevo usuario
$sql = "INSERT INTO Usuarios (Nombre, Email, Contraseña) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $email, $password); // 'sss' significa que todos los parámetros son strings
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Usuario registrado exitosamente";
    // Aquí podrías redirigir al usuario a la página de login o a otra página
} else {
    echo "Error al registrar el usuario: " . $conn->error;
}

$conn->close();
