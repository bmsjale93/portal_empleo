<?php
session_start();
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
          <li><a class="nav-link active" href="#hero">Inicio</a></li>
          <li><a class="nav-link" href="#about">Ofertas de Trabajo</a></li>
          <li><a class="nav-link" href="#contact">Contacto</a></li>
          <?php if (isset($_SESSION['nombreUsuario'])) : ?>
            <li><a href="#">Bienvenido, <?php echo htmlspecialchars($_SESSION['nombreUsuario']); ?></a></li>
          <?php else : ?>
            <li><a class="nav-link login-trigger" href="#loginModal">Iniciar Sesión</a></li>
            <li><a class="nav-link register-trigger" href="#registerModal">Registrarse</a></li>
          <?php endif; ?>
        </ul>
      </nav>
      <div>
        <!-- Menú (oculto por defecto) -->
        <nav id="navbar-mobile" class="navbar-mobile">
          <ul>
            <li><a class="nav-link active" href="#hero">Inicio</a></li>
            <li><a class="nav-link" href="#about">Ofertas de Trabajo</a></li>
            <li><a class="nav-link login-trigger" href="#loginModal">Iniciar Sesión</a></li>
            <li><a class="nav-link register-trigger" href="registerModal">Registrarse</a>
            <li><a class="nav-link" href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
      <i class="fa fa-bars mobile-nav-toggle"></i>
    </div>
  </header>

  <!-- ======= Hero Section ======= -->
  <section id="hero">

    <div class="hero-content">
      <h2>Bienvenidos a<br>Work <span>Now</span></h2>
      <div>
        <a href="#" class="btn-get-started scrollto">Ofertas de Trabajo</a>
        <a href="#" class="btn-projects scrollto">Contáctanos Ahora</a>
      </div>
    </div>

    <div class="hero-slider swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background-image: url('assets/img/hero-carousel/1.jpg');"></div>
        <div class="swiper-slide" style="background-image: url('assets/img/hero-carousel/2.jpg');"></div>
        <div class="swiper-slide" style="background-image: url('assets/img/hero-carousel/3.jpg');"></div>
        <div class="swiper-slide" style="background-image: url('assets/img/hero-carousel/4.jpg');"></div>
        <div class="swiper-slide" style="background-image: url('assets/img/hero-carousel/5.jpg');"></div>
      </div>
    </div>

  </section>
  <!-- End Hero Section -->

  <main id="main">

    <!-- ======= About Section ======= -->
    <section id="about">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-6 about-img">
            <img src="assets/img/about-img.jpg" alt="">
          </div>

          <div class="col-lg-6 content">
            <h2>¿Estás buscando trabajo?</h2>
            <h3>En WorkNow podrás aplicar a los últimos empleos subidos por las empresas asociadas
              a nuestra plataforma.
            </h3>

            <ul>
              <li><i class="fa-solid fa-check"></i> Categorizados por Sector.</li>
              <li><i class="fa-solid fa-check"></i> Revisa en Vivo tus Ofertas.</li>
              <li><i class="fa-solid fa-check"></i> ¡Empieza a trabajar!</li>
            </ul>

          </div>
        </div>

      </div>
    </section>
    <!-- End About Section -->

    <!-- ======= Services Section ======= -->
    <section id="services">
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Servicios</h2>
          <p>¡No pierdas más tiempo y empieza a aplicar para tu puesto de trabajo ideal!
          </p>
        </div>

        <div class="row gy-4">

          <div class="col-lg-4 col-md-6">
            <div class="box">
              <div class="icon"><i class="fa-solid fa-magnifying-glass"></i></div>
              <h4 class="title"><a href="">Explora Ofertas</a></h4>
              <p class="description">Navega a través de las distintas ofertas de trabajo disponibles.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="box">
              <div class="icon"><i class="fa-solid fa-arrow-right-to-bracket"></i></div>
              <h4 class="title login-trigger"><a href="loginModal">Inicia</br>Sesión</a></h4>
              <p class="description">Accede a tu cuenta para administrar tus ofertas de empleo, así como tu CV.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="box">
              <div class="icon"><i class="fa-solid fa-key"></i></div>
              <h4 class="title register-trigger"><a href="registerModal">Regístrate</br>Ahora</a></h4>
              <p class="description">Crea una cuenta para poder aplicar a ofertas de trabajo y subir tu CV.</p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Services Section -->

    <!-- ======= Clients Section ======= -->
    <section id="clients">
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Nuestros Clientes</h2>
          <p>Descubre todas las empresas que trabajan con nosotros y descubre el trabajo ideal que estabas buscando.</p>
        </div>

        <div class="clients-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div class="swiper-wrapper align-items-center">
            <div class="swiper-slide"><img src="assets/img/clients/client-1.png" class="img-fluid" alt=""></div>
            <div class="swiper-slide"><img src="assets/img/clients/client-2.png" class="img-fluid" alt=""></div>
            <div class="swiper-slide"><img src="assets/img/clients/client-3.png" class="img-fluid" alt=""></div>
            <div class="swiper-slide"><img src="assets/img/clients/client-4.png" class="img-fluid" alt=""></div>
            <div class="swiper-slide"><img src="assets/img/clients/client-5.png" class="img-fluid" alt=""></div>
            <div class="swiper-slide"><img src="assets/img/clients/client-6.png" class="img-fluid" alt=""></div>
            <div class="swiper-slide"><img src="assets/img/clients/client-7.png" class="img-fluid" alt=""></div>
            <div class="swiper-slide"><img src="assets/img/clients/client-8.png" class="img-fluid" alt=""></div>
          </div>
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </section><!-- End Clients Section -->

    <!-- ======= Testimonials Section ======= -->
    <section id="testimonials">
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Nuestros Clientes Hablan por Nosotros</h2>
          <p>En WorkNow nos enorgullecemos de conectar talentos con oportunidades. Nada nos satisface más que ver cómo nuestros usuarios alcanzan sus metas profesionales. Aquí te presentamos algunos testimonios de clientes que han encontrado el éxito a través de nuestra plataforma. ¡Sus historias podrían ser la inspiración que necesitas para dar el siguiente paso en tu carrera!</p>
        </div>

        <div class="testimonials-slider swiper">
          <div class="swiper-wrapper">

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img src="assets/img/quote-sign-left.png" class="quote-sign-left" alt="">
                  Descubrí Work Now cuando estaba buscando una oportunidad de crecimiento profesional. En solo unas semanas, encontré un proyecto que se ajustaba perfectamente a mis habilidades y expectativas.
                  <img src="assets/img/quote-sign-right.png" class="quote-sign-right" alt="">
                </p>
                <img src="assets/img/testimonial-1.jpg" class="testimonial-img" alt="">
                <h3>Laura Gómez</h3>
                <h4>Diseñadora &amp; Gráfica</h4>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img src="assets/img/quote-sign-left.png" class="quote-sign-left" alt="">
                  Estaba un poco escéptico sobre los portales de empleo, pero WorkNow cambió mi perspectiva. Su interfaz intuitiva y las ofertas de trabajo relevantes me ayudaron a encontrar mi empleo actual en una empresa líder en tecnología.
                  <img src="assets/img/quote-sign-right.png" class="quote-sign-right" alt="">
                </p>
                <img src="assets/img/testimonial-2.jpg" class="testimonial-img" alt="">
                <h3>Carlos Martín</h3>
                <h4>Ingeniero de Software</h4>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img src="assets/img/quote-sign-left.png" class="quote-sign-left" alt="">
                  Como gerente de marketing, siempre busco los mejores talentos para mi equipo. WorkNow ha sido una herramienta invaluable para encontrar candidatos calificados y motivados. ¡El proceso de contratación nunca ha sido tan fácil!
                  <img src="assets/img/quote-sign-right.png" class="quote-sign-right" alt="">
                </p>
                <img src="assets/img/testimonial-3.jpg" class="testimonial-img" alt="">
                <h3>Sofía Rodríguez</h3>
                <h4>Gerente de Marketing</h4>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img src="assets/img/quote-sign-left.png" class="quote-sign-left" alt="">
                  Trabajar de manera independiente puede ser desafiante, especialmente al buscar clientes. Desde que me uní a WorkNow, he tenido un flujo constante de proyectos interesantes. Es una plataforma que realmente apoya a los freelancers.
                  <img src="assets/img/quote-sign-right.png" class="quote-sign-right" alt="">
                </p>
                <img src="assets/img/testimonial-4.jpg" class="testimonial-img" alt="">
                <h3>Jorge Alonso</h3>
                <h4>Freelancer en Desarrollo Web</h4>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img src="assets/img/quote-sign-left.png" class="quote-sign-left" alt="">
                  Como recién graduada, me enfrentaba al desafío de encontrar mi primer empleo. WorkNow no solo me ayudó a encontrar oportunidades adecuadas, sino que también ofrecía recursos para mejorar mi CV y prepararme para entrevistas. ¡Logré mi primer empleo en menos de un mes!
                  <img src="assets/img/quote-sign-right.png" class="quote-sign-right" alt="">
                </p>
                <img src="assets/img/testimonial-5.jpg" class="testimonial-img" alt="">
                <h3>Ana Belén Vargas</h3>
                <h4>Recién Graduada</h4>
              </div>
            </div><!-- End testimonial item -->

          </div>
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </section><!-- End Testimonials Section -->

  </main><!-- End #main -->

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

  <script src="assets/js/main.js"></script>


</body>

</html>