<?php
session_start();
require 'db.php';

if (!isset($_SESSION['userID'])) {
  header('Location: login.php');
  exit;
}

$userID = $_SESSION['userID'];
// Preparar la consulta para obtener la información del usuario
$sql = "SELECT Nombre, Email, Direccion, Ciudad, Pais, CodigoPostal, Telefono FROM Usuarios WHERE ID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();
$userInfo = $result->fetch_assoc();

if (!$userInfo) {
  echo "No se pudo cargar la información del usuario.";
  exit;
}
$conn->close();
?>


<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil del Usuario - Portal de Empleo</title>
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">
  <link href="assets/css/style.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
</head>

<body>

  <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="index.php">Work<span>Now</span></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.php">Inicio</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="perfil_usuario.php">Mi Perfil <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="logout.php">Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="py-4">
    <div class="container">
      <div class="row">
        <!-- Información Personal -->
        <div class="col-lg-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Información Personal</h5>
              <p>Nombre: <?php echo htmlspecialchars($userInfo['Nombre']); ?></p>
              <p>Email: <?php echo htmlspecialchars($userInfo['Email']); ?></p>
              <p>Dirección: <?php echo htmlspecialchars($userInfo['Direccion']); ?></p>
              <p>Ciudad: <?php echo htmlspecialchars($userInfo['Ciudad']); ?></p>
              <p>País: <?php echo htmlspecialchars($userInfo['Pais']); ?></p>
              <p>Código Postal: <?php echo htmlspecialchars($userInfo['CodigoPostal']); ?></p>
              <p>Teléfono: <?php echo htmlspecialchars($userInfo['Telefono']); ?></p>
            </div>
          </div>
        </div>

        <!-- Aplicaciones y CV -->
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Mis Aplicaciones</h5>
              <!-- Las aplicaciones se cargarán aquí -->
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Subir Currículum</h5>
              <form>
                <div class="form-group">
                  <input type="file" class="form-control-file">
                </div>
                <button type="submit" class="btn btn-primary">Subir</button>
              </form>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Eliminar Cuenta</h5>
              <button class="btn btn-danger" onclick="deleteAccount()">Eliminar mi cuenta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer class="bg-dark text-white py-4">
    <div class="container text-center">
      Portal de Búsqueda de Trabajo © 2024
    </div>
  </footer>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<script>
    function deleteAccount() {
      const confirmation = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
      if (confirmation) {
        // Implementar la lógica para eliminar la cuenta aquí
      }
    }
  </script>

</body>

</html> 