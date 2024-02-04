<?php
include 'db.php';

header('Content-Type: application/json');

// Verifica si se ha pasado una categoría como parámetro en la URL
$category = isset($_GET['category']) && $_GET['category'] !== 'all' ? $_GET['category'] : null;

// Prepara la consulta SQL base
$sql = "SELECT ID, Titulo, Descripcion, Categoria, DATE_FORMAT(FechaPublicacion, '%Y-%m-%d') AS FechaPublicacion FROM Ofertas WHERE Activa = 1";

// Si se ha especificado una categoría, modifica la consulta SQL para filtrar por categoría
if ($category !== null) {
    $sql .= " AND Categoria = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category); // Vincula el parámetro de categoría a la consulta
} else {
    $stmt = $conn->prepare($sql);
}

$stmt->execute();
$result = $stmt->get_result();

$ofertas = [];

// Verifica si la consulta devuelve filas
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $ofertas[] = $row;
    }
    echo json_encode($ofertas);
} else {
    echo json_encode(["error" => "No se encontraron ofertas de trabajo activas en la categoría seleccionada."]);
}

$conn->close();
