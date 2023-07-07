<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-scroll" :class="{ 'fixed-top': !isNavHidden, 'hide': isNavHidden }">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Logo</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
              <form class="d-flex mt-3 mt-lg-0" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isNavHidden: false, // Початково заголовок не схований
      lastScrollTop: 0, // Зберігаємо попереднє значення позиції прокрутки
      ticking: false // Флаг, щоб контролювати виконання функції обробки прокрутки
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.ticking) {
        // Запускаємо заплановану функцію обробки прокрутки
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop;

          if (scrolled > this.lastScrollTop) {
            // Прокручування вниз
            this.isNavHidden = true;
          } else {
            // Прокручування вгору
            this.isNavHidden = false;
          }

          this.lastScrollTop = scrolled;
          this.ticking = false;
        });

        this.ticking = true; // Встановлюємо флаг для позначення виконання запланованої функції
      }
    }
  }
};
</script>

<style>
/* Додайте стилі для ефекту випливання зверху */
.hide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0s 0.3s;
}

.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0s 0s;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}


</style>
