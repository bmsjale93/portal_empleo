<?php
session_start();

// Incluye la conexión a la base de datos
include 'db.php'; // Asegúrate de que la ruta es correcta

// Verifica si el usuario ha iniciado sesión
if (!isset($_SESSION['userID'])) {
    echo "Es necesario iniciar sesión para subir un currículum.";
    exit;
}

// Verifica si el archivo ha sido subido
if (!isset($_FILES['cv']['error']) || is_array($_FILES['cv']['error'])) {
    echo 'Error en la subida del archivo.';
    exit;
}

// Maneja los errores de subida
switch ($_FILES['cv']['error']) {
    case UPLOAD_ERR_OK:
        break;
    case UPLOAD_ERR_NO_FILE:
        echo 'No se ha subido ningún archivo.';
        exit;
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE:
        echo 'Excedido tamaño de archivo permitido.';
        exit;
    default:
        echo 'Error desconocido en la subida.';
        exit;
}

// Valida el tipo de archivo (solo se permiten PDFs)
$tipoArchivo = strtolower(pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION));
if ($tipoArchivo != "pdf") {
    echo "Solo se permiten archivos PDF.";
    exit;
}

// Define el directorio de destino para los archivos subidos
$directorioDestino = __DIR__ . '/uploads/cv/';
if (!file_exists($directorioDestino)) {
    mkdir($directorioDestino, 0777, true);
}

// Crea un nombre de archivo único para evitar sobreescrituras
$nombreArchivo = uniqid() . "_" . basename($_FILES["cv"]["name"]);
$archivoDestino = $directorioDestino . $nombreArchivo;

// Intenta mover el archivo subido al directorio de destino
if (!move_uploaded_file($_FILES["cv"]["tmp_name"], $archivoDestino)) {
    echo 'Error al mover el archivo subido.';
    exit;
}

// Inserta la información del archivo en la base de datos
$usuarioID = $_SESSION['userID'];
$rutaArchivo = $archivoDestino;

$sql = "INSERT INTO Curriculums (usuarioID, nombreArchivo, rutaArchivo) VALUES (?, ?, ?)";
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("iss", $usuarioID, $nombreArchivo, $rutaArchivo);
    if (!$stmt->execute()) {
        echo 'Error al guardar la información del archivo en la base de datos.';
    } else {
        echo "El archivo " . htmlspecialchars($nombreArchivo) . " ha sido subido y registrado.";
    }
    $stmt->close();
} else {
    echo 'Error al preparar la consulta.';
}

$conn->close();
