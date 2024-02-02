<?php
// Conexión a la base de datos
include 'db.php'; // Asegúrate de que este archivo contenga los detalles de conexión a tu base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recuperar los valores del formulario
    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $direccion = trim($_POST['direccion']);
    $ciudad = trim($_POST['ciudad']);
    $pais = trim($_POST['pais']);
    $codigoPostal = trim($_POST['codigoPostal']);
    $telefono = trim($_POST['telefono']);
    $tipoUsuario = trim($_POST['tipoUsuario']); // Reclutador o Candidato

    // Validaciones básicas del lado del servidor
    if (empty($nombre) || empty($email) || empty($password) || empty($direccion) || empty($ciudad) || empty($pais) || empty($codigoPostal) || empty($telefono) || empty($tipoUsuario)) {
        echo "Por favor complete todos los campos.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Formato de correo electrónico inválido.";
        exit;
    }

    // Hash de la contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Preparar el statement SQL para insertar el nuevo usuario
    $sql = "INSERT INTO Usuarios (Nombre, Email, Password, Direccion, Ciudad, Pais, CodigoPostal, Telefono, TipoUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssssssss", $nombre, $email, $passwordHash, $direccion, $ciudad, $pais, $codigoPostal, $telefono, $tipoUsuario);

        if ($stmt->execute()) {
            echo "Usuario registrado exitosamente.";
            // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        } else {
            echo "Error al registrar el usuario: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error al preparar la consulta: " . $conn->error;
    }

    $conn->close();
} else {
    // Redireccionar al formulario si se intenta acceder a este script directamente sin enviar el formulario
    header("Location: formulario_registro.php");
    exit;
}

// Iniciar la sesión
session_start();

// Supongamos que $nombreUsuario es el nombre del usuario que se ha autenticado o registrado
$_SESSION['nombreUsuario'] = $nombreUsuario;
