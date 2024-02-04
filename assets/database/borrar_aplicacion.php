<?php
session_start();
include 'db.php';

if (!isset($_SESSION['userID'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $aplicacionID = $_POST['aplicacionID'];

    // Verificar que la aplicación pertenezca al usuario logueado
    $sqlVerificar = "SELECT * FROM Aplicaciones WHERE ID = ? AND UsuarioID = ?";
    $stmtVerificar = $conn->prepare($sqlVerificar);
    $stmtVerificar->bind_param("ii", $aplicacionID, $_SESSION['userID']);
    $stmtVerificar->execute();
    $resultadoVerificar = $stmtVerificar->get_result();
    if ($resultadoVerificar->num_rows == 0) {
        echo json_encode(['success' => false, 'message' => 'No se encontró la aplicación o no tienes permiso para borrarla']);
        exit;
    }

    // Borrar la aplicación
    $sql = "DELETE FROM Aplicaciones WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $aplicacionID);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Aplicación borrada con éxito']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al borrar la aplicación']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido']);
}

$conn->close();
