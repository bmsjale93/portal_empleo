<?php
session_start();
include 'db.php';

if (!isset($_SESSION['userID'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

// Asegúrate de que el método de solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuarioID = $_SESSION['userID'];
    $ofertaID = $_POST['ofertaID'];

    // Preparar y ejecutar la consulta para insertar la aplicación
    $sql = "INSERT INTO Aplicaciones (UsuarioID, OfertaID) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $usuarioID, $ofertaID);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Aplicación registrada exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar la aplicación']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido']);
}
