<?php
session_start();
include 'assets/database/db.php';

// Verificar si se ha pasado un ID de oferta en la URL
if (!isset($_GET['id'])) {
    die("Error: No se especificó ID de oferta.");
}
$ofertaID = $_GET['id'];

// Preparar y ejecutar la consulta para obtener detalles de la oferta específica
$sql = "SELECT * FROM Ofertas WHERE ID = ?";
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("i", $ofertaID);
    $stmt->execute();
    $resultado = $stmt->get_result();
    if ($oferta = $resultado->fetch_assoc()) {
        // La variable $oferta contiene ahora los detalles
    } else {
        die("Error: Oferta no encontrada.");
    }
    $stmt->close();
} else {
    die("Error de preparación de consulta: " . $conn->error);
}
$conn->close();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Portal de Búsqueda de Empleo</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="assets/img/favicon-worknow.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Template Main CSS File -->
    <link href="assets/css/style.css" rel="stylesheet">

    <!-- FontAwesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <!-- AJAX -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>

    <!-- ======= Top Bar ======= -->
    <section id="topbar" class="d-flex align-items-center">
        <div class="container d-flex justify-content-between">
            <div class="contact-info d-flex align-items-center">
                <i class="fa fa-envelope d-flex align-items-center">
                    <a href="mailto:contacto@worknow.com">contacto@worknow.com</a>
                </i>
                <i class="fa fa-phone d-flex align-items-center ms-4">
                    <span>+34 612 612 612</span>
                </i>
            </div>
            <div class="social-links d-flex align-items-center">
                <a href="#" class="twitter"><i class="fa-brands fa-twitter"></i></a>
                <a href="#" class="facebook"><i class="fa-brands fa-facebook"></i></a>
                <a href="#" class="instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="linkedin"><i class="fa-brands fa-linkedin"></i></a>
            </div>
        </div>
    </section>
    <!-- End Top Bar -->

    <!-- ======= Header ======= -->
    <header id="header" class="d-flex align-items-center">
        <div class="container d-flex justify-content-between">
            <div id="logo">
                <h1><a href="index.php">Work<span>Now</span></a></h1>
            </div>
            <nav id="navbar" class="navbar">
                <ul>
                    <li><a class="nav-link active" href="index.php">Inicio</a></li>
                    <li><a class="nav-link" href="ofertas_trabajo.php">Ofertas de Trabajo</a></li>
                    <li><a class="nav-link" href="contacto.php">Contacto</a></li>
                    <?php if (isset($_SESSION['userID'])) : ?>
                        <!-- Si el usuario ha iniciado sesión, mostrar su nombre y la opción de cerrar sesión -->
                        <li><a class="nav-link" href="usuario.php">Bienvenido, <?php echo htmlspecialchars($_SESSION['nombreUsuario']); ?></a></li>
                        <li><a class="nav-link" href="assets/database/logout.php">Cerrar Sesión</a></li>
                    <?php else : ?>
                        <!-- Si el usuario no ha iniciado sesión, mostrar opciones de inicio de sesión y registro -->
                        <li><a class="nav-link login-trigger" href="#loginModal">Iniciar Sesión</a></li>
                        <li><a class="nav-link register-trigger" href="#registerModal">Registrarse</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
            <div>
                <!-- Menú (oculto por defecto) -->
                <nav id="navbar-mobile" class="navbar-mobile">
                    <ul>
                        <li><a class="nav-link active" href="index.php">Inicio</a></li>
                        <li><a class="nav-link" href="ofertas_trabajo.php">Ofertas de Trabajo</a></li>
                        <li><a class="nav-link" href="contacto.php">Contacto</a></li>
                        <?php if (isset($_SESSION['userID'])) : ?>
                            <!-- Si el usuario ha iniciado sesión, mostrar su nombre y la opción de cerrar sesión -->
                            <li><a class="nav-link" href="usuario.php">Bienvenido, <?php echo htmlspecialchars($_SESSION['nombreUsuario']); ?></a></li>
                            <li><a class="nav-link" href="assets/database/logout.php">Cerrar Sesión</a></li>
                        <?php else : ?>
                            <!-- Si el usuario no ha iniciado sesión, mostrar opciones de inicio de sesión y registro -->
                            <li><a class="nav-link login-trigger" href="#loginModal">Iniciar Sesión</a></li>
                            <li><a class="nav-link register-trigger" href="#registerModal">Registrarse</a></li>
                        <?php endif; ?>
                    </ul>
                </nav>
            </div>
            <i class="fa fa-bars mobile-nav-toggle"></i>
        </div>
    </header>

    <!-- Sección Hero con detalles de la oferta -->
    <section id="hero-ofertas">
        <div class="hero-content">
            <h2><?php echo htmlspecialchars($oferta['Titulo']); ?> <br><span><?php echo htmlspecialchars($oferta['Categoria']); ?></span></h2>
            <p class="text-muted">Publicado el <?php echo date('d/m/Y', strtotime($oferta['FechaPublicacion'])); ?></p>
        </div>
    </section>

    <!-- Sección con los detalles de la oferta -->
    <section id="ofertas">
        <div class="container pt-5">
            <div class="section-ofertas">
                <div class="text-ofertas">
                    <h2>Descripción del Trabajo</h2>
                    <p><?php echo nl2br(htmlspecialchars($oferta['Descripcion'])); ?></p>
                </div>
                <div class="text-ofertas">
                    <h2>Requisitos</h2>
                    <p><?php echo nl2br(htmlspecialchars($oferta['Requisitos'])); ?></p>

                </div>
                <div class="text-ofertas">
                    <h2>Beneficios</h2>
                    <p><?php echo nl2br(htmlspecialchars($oferta['Beneficios'])); ?></p>
                </div>
                <?php if (isset($_SESSION['userID'])) : ?>
                    <div class="apply-section">
                        <button onclick="aplicarOferta(<?php echo $ofertaID; ?>)" class="btn btn-primary apply-btn">Aplicar a esta oferta</button>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 bg-dark text-white-50">
        <div class="container text-center">
            <small>Portal de Búsqueda de Trabajo © 2024 | Desarrollado por Alejandro Delgado & Álzaro Alvarez |</small>
        </div>
    </footer>

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <!-- Contenedores para las Ventanas Emergentes -->
    <div id="login-modal-container"></div>
    <div id="register-modal-container"></div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <script src="assets/js/modal.js"></script>
    <script src="assets/js/login_register.js"></script>
    <script src="assets/js/menu-responsive.js"></script>
    <script src="assets/js/get_detalle_oferta.js"></script>
    <script src="assets/js/aplicar_oferta_unica.js"></script>


</body>

</html>