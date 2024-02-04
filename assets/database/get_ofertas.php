<?php
include 'db.php';

header('Content-Type: application/json');

$sql = "SELECT ID, Titulo, Descripcion, Categoria, DATE_FORMAT(FechaPublicacion, '%Y-%m-%d') AS FechaPublicacion FROM Ofertas WHERE Activa = 1 ORDER BY FechaPublicacion DESC";
$result = $conn->query($sql);

$ofertas = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $ofertas[] = $row;
    }
    echo json_encode($ofertas);
} else {
    echo json_encode(["error" => "No se encontraron ofertas de trabajo activas."]);
}

$conn->close();
