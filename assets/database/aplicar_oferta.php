<?php
include 'db.php';

$idUsuario = $_POST['idUsuario']; // ID del usuario que aplica
$idOferta = $_POST['idOferta']; // ID de la oferta de trabajo

$sql = "INSERT INTO aplicaciones (id_usuario, id_oferta) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $idUsuario, $idOferta);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Aplicación realizada con éxito";
} else {
    echo "Error al aplicar a la oferta: " . $conn->error;
}

$conn->close();
