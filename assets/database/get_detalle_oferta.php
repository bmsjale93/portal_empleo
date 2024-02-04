<?php
include 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM Ofertas WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($oferta = $result->fetch_assoc()) {
        echo json_encode($oferta);
    } else {
        echo json_encode(null);
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(null); // Devolver nulo si no hay ID
}
