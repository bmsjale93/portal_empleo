<?php
include 'db.php';

$sql = "SELECT * FROM ofertas_de_trabajo";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Titulo: " . $row["titulo"] . " - Descripcion: " . $row["descripcion"] . " - Requisitos: " . $row["requisitos"] . "<br>";
    }
} else {
    echo "0 resultados";
}

$conn->close();
