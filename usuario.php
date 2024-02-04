<?php
session_start();
include 'assets/database/db.php';

if (!isset($_SESSION['userID'])) {
  echo "No se encuentra el ID"; // Redirige al usuario a la página de inicio de sesión si no está logueado
  exit;
}

$userID = $_SESSION['userID'];
// Obtener la información del usuario
$sql = "SELECT * FROM Usuarios WHERE ID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();
$userInfo = $result->fetch_assoc();

if (!$userInfo) {
  echo "No se pudo cargar la información del usuario.";
  exit;
}

// Obtener las aplicaciones del usuario
$aplicacionesSql = "SELECT Aplicaciones.ID as AplicacionID, Aplicaciones.FechaAplicacion, Ofertas.Titulo, Ofertas.Descripcion 
          FROM Aplicaciones 
          JOIN Ofertas ON Aplicaciones.OfertaID = Ofertas.ID 
          WHERE Aplicaciones.UsuarioID = ?";
$stmt = $conn->prepare($aplicacionesSql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$aplicacionesResult = $stmt->get_result();


$aplicaciones = [];
while ($aplicacion = $aplicacionesResult->fetch_assoc()) {
  $aplicaciones[] = $aplicacion;
}
$stmt->close();
?>


<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Usuario - Portal de Empleo</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link href="assets/css/user_style.css" rel="stylesheet">
</head>

<body id="userProfilePage">
  <header id="userHeader">
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
              <a class="nav-link" href="ofertas_trabajo.php">Ofertas de Trabajo<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="assets/database/logout.php">Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main id="userMain" class="py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div id="userPersonalInfoCard" class="card">
            <div class="card-header">Información Personal</div>
            <div class="card-body">
              <p>Nombre: <?php echo htmlspecialchars($userInfo['Nombre']); ?></p>
              <p>Email: <?php echo htmlspecialchars($userInfo['Email']); ?></p>
              <p>Dirección: <?php echo htmlspecialchars($userInfo['Direccion']); ?></p>
              <p>Ciudad: <?php echo htmlspecialchars($userInfo['Ciudad']); ?></p>
              <p>País: <?php echo htmlspecialchars($userInfo['Pais']); ?></p>
              <p>Código Postal: <?php echo htmlspecialchars($userInfo['CodigoPostal']); ?></p>
              <p>Teléfono: <?php echo htmlspecialchars($userInfo['Telefono']); ?></p>
              <p>Tipo de Usuario: <?php echo htmlspecialchars($userInfo['TipoUsuario']); ?></p>
              <p>Fecha de Registro: <?php echo htmlspecialchars(date('d/m/Y H:i:s', strtotime($userInfo['FechaRegistro']))); ?></p>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div id="userApplicationsCard" class="card mb-4">
            <div class="card-header">Mis Aplicaciones</div>
            <div class="card-body">
              <?php if (count($aplicaciones) > 0) : ?>
                <ul class="list-group">
                  <?php foreach ($aplicaciones as $aplicacion) : ?>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h5><?php echo htmlspecialchars($aplicacion['Titulo']); ?></h5>
                        <p><?php echo htmlspecialchars($aplicacion['Descripcion']); ?></p>
                        <small>Aplicado el: <?php echo htmlspecialchars($aplicacion['FechaAplicacion']); ?></small>
                      </div>
                      <button class="btn btn-danger btn-sm delete-application" data-id="<?php echo $aplicacion['AplicacionID']; ?>">Borrar</button>
                    </li>
                  <?php endforeach; ?>
                </ul>
              <?php else : ?>
                <p>No has aplicado a ninguna oferta aún.</p>
              <?php endif; ?>
            </div>
          </div>

          <?php
          $sql = "SELECT id, nombreArchivo, rutaArchivo, fechaSubida FROM Curriculums WHERE usuarioID = ?";
          if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $_SESSION['userID']);
            $stmt->execute();
            $resultado = $stmt->get_result();

            echo "<div id='userCurriculumsCard' class='card mb-4'>";
            echo "<div class='card-header'>Mis Currículums</div>";
            echo "<div class='card-body'>";
            if ($resultado->num_rows > 0) {
              echo "<ul class='list-group'>";
              while ($row = $resultado->fetch_assoc()) {
                echo "<li class='list-group-item d-flex justify-content-between align-items-center'>";
                echo htmlspecialchars($row['nombreArchivo']);
                echo " <small>Subido el: " . date("d/m/Y", strtotime($row['fechaSubida'])) . "</small>";
                // Botón para borrar el currículum
                echo "<button class='btn btn-danger btn-sm' onclick='borrarCurriculum(" . $row['id'] . ")'>Borrar</button>";
                echo "</li>";
              }
              echo "</ul>";
            } else {
              echo "<p>No has subido ningún currículum aún.</p>";
            }
            echo "</div>";
            echo "</div>";
            $stmt->close();
          }
          $conn->close();
          ?>
          <div id="userUploadCvCard" class="card mb-4">
            <div class="card-header">Subir Currículum</div>
            <div class="card-body">
              <form id="uploadCvForm" method="post" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="cvFile">Seleccione el archivo de Currículum (PDF, máximo 2MB):</label>
                  <input type="file" class="form-control-file" id="cvFile" name="cv" required>
                </div>
                <button type="submit" class="btn btn-primary">Subir</button>
              </form>
            </div>
          </div>
          <div id="userAccountSettingsCard" class="card">
            <div class="card-header">Configuración de la Cuenta</div>
            <div class="card-body">
              <button class="btn btn-danger" onclick="deleteAccount()">Eliminar Cuenta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="py-4 bg-dark text-white-50">
    <div class="container text-center">
      <small>Portal de Búsqueda de Trabajo © 2024 | Desarrollado por Alejandro Delgado & Álzaro Alvarez |</small>
    </div>
  </footer>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

  <script src="assets/js/modal.js"></script>
  <script src="assets/js/login_register.js"></script>
  <script src="assets/js/application-status.js"></script>
  <script src="assets/js/delete_account.js"></script>
  <script src="assets/js/upload_cv.js"></script>
  <script src="assets/js/delete_cv.js"></script>
  <script src="assets/js/borrar_aplicacion.js"></script>

</body>

</html>