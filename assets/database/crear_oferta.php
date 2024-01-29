<?php
include 'db.php';

$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];
$requisitos = $_POST['requisitos'];

$sql = "INSERT INTO Ofertas_de_TRabajo (titulo, descripcion, requisitos) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $titulo, $descripcion, $requisitos);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Oferta de trabajo creada exitosamente";
} else {
    echo "Error al crear la oferta: " . $conn->error;
}

$conn->close();
