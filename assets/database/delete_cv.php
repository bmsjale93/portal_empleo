<?php
session_start();
include 'db.php'; // Ajusta la ruta según sea necesario

// Verificar si el usuario está logueado
if (!isset($_SESSION['userID'])) {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

// Obtener el cuerpo de la solicitud
$content = file_get_contents("php://input");
$data = json_decode($content, true);

// ID del currículum a borrar
$idCurriculum = $data['id'];

// Primero, obtener la ruta del archivo para poder borrarlo del servidor
$sql = "SELECT rutaArchivo FROM Curriculums WHERE id = ? AND usuarioID = ?";
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ii", $idCurriculum, $_SESSION['userID']);
    $stmt->execute();
    $resultado = $stmt->get_result();
    if ($archivo = $resultado->fetch_assoc()) {
        // Borrar el archivo del servidor
        if (unlink($archivo['rutaArchivo'])) {
            // Borrar el registro de la base de datos
            $sqlBorrar = "DELETE FROM Curriculums WHERE id = ?";
            if ($stmtBorrar = $conn->prepare($sqlBorrar)) {
                $stmtBorrar->bind_param("i", $idCurriculum);
                $stmtBorrar->execute();
                echo json_encode(['success' => true, 'message' => 'Currículum borrado']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al borrar en la base de datos']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al borrar el archivo']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Archivo no encontrado']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta']);
}
$conn->close();
