<?php
session_start();
?>

<?php
session_start();
include 'assets/database/db.php';

// Consulta para obtener categorías únicas
$sqlCategorias = "SELECT DISTINCT Categoria FROM Ofertas ORDER BY Categoria";
$categoriasResult = $conn->query($sqlCategorias);

$categorias = [];
if ($categoriasResult->num_rows > 0) {
    while ($row = $categoriasResult->fetch_assoc()) {
        $categorias[] = $row['Categoria'];
    }
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
    <link href="assets/img/favicon.png" rel="icon">
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
                    <a href="mailto:contact@example.com">contacto@trabajoempleo.com</a>
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
                <h1><a href="index.html">Work<span>Now</span></a></h1>
            </div>
            <nav id="navbar" class="navbar">
                <ul>
                    <li><a class="nav-link active" href="index.php">Inicio</a></li>
                    <li><a class="nav-link" href="ofertas_trabajo.php">Ofertas de Trabajo</a></li>
                    <li><a class="nav-link" href="contacto.html">Contacto</a></li>
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
                        <li><a class="nav-link" href="contacto.html">Contacto</a></li>
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

    <!-- ======= Hero Section ======= -->
    <section id="hero-ofertas">
        <div class="hero-content">
            <div class="text-ofertas">
                <h2>Ofertas de Trabajo</h2>
                <p>Explora las últimas ofertas de trabajo y encuentra la que mejor se ajusta a tus habilidades y carrera profesional.</p>
            </div>
        </div>
    </section>
    <!-- Formulario de Filtro -->
    <section id="ofertas" class="py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="mb-4 text-center">Buscar Ofertas de Trabajo</h2>
                    <form id="filterForm" class="form-inline justify-content-center">
                        <div class="form-group mb-2 mr-sm-3">
                            <input type="text" id="searchKeyword" class="form-control" placeholder="Palabra clave..." aria-label="Palabra clave">
                        </div>
                        <div class="form-group mb-2 mr-sm-3">
                            <select id="categorySelect" class="form-control">
                                <option value="all">Todas las Categorías</option>
                                <?php foreach ($categorias as $categoria) : ?>
                                    <option value="<?php echo htmlspecialchars($categoria); ?>">
                                        <?php echo htmlspecialchars($categoria); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary mb-2">Buscar</button>
                    </form>
                </div>
            </div>
        </div>
        <!-- Contenedor para Ofertas -->
        <div id="offersContainer" class="container-ofertas">
            <!-- Las ofertas se cargarán aquí dinámicamente -->
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 bg-dark text-white-50">
        <div class="container text-center">
            <small>Portal de Búsqueda de Trabajo © 2024</small>
        </div>
    </footer>

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <!-- Contenedores para las Ventanas Emergentes -->
    <div id="login-modal-container"></div>
    <div id="register-modal-container"></div>

    <!-- Carga Ventanas Emergentes -->
    <script>
        $(document).ready(function() {
            $("#login-modal-container").load("loginModal.html");
            $("#register-modal-container").load("registerModal.html");
        });
    </script>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <script src="assets/js/modal.js"></script>
    <script src="assets/js/login_register.js"></script>
    <script src="assets/js/get_ofertas.js"></script>
    <script src="assets/js/menu-responsive.js"></script>

</body>

</html>