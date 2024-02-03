<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "portal_empleo";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
