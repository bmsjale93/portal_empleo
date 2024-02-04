<?php
session_start();
include 'db.php';

// Comprobar si el usuario está autenticado
if (!isset($_SESSION['userID'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido']);
    exit;
}

$usuarioID = $_SESSION['userID'];
$ofertaID = isset($_POST['ofertaID']) ? $_POST['ofertaID'] : null;

// Verificar si ya existe una aplicación para esa oferta por parte del usuario
$sql = "SELECT * FROM Aplicaciones WHERE UsuarioID = ? AND OfertaID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $usuarioID, $ofertaID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Existe una aplicación previa, no permitir una nueva aplicación.
    echo json_encode(['success' => false, 'message' => 'Ya has aplicado a esta oferta.']);
    exit;
}

// Preparar y ejecutar la consulta para insertar la nueva aplicación
$sql = "INSERT INTO Aplicaciones (UsuarioID, OfertaID) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

// Verificar si el stmt pudo ser preparado correctamente
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta']);
    exit;
}

$stmt->bind_param("ii", $usuarioID, $ofertaID);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Aplicación registrada exitosamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar la aplicación']);
}

$stmt->close();
$conn->close();
