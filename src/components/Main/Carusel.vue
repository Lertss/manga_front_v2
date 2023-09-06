<template>
<div id="carouselExampleCaptions" class="carousel slide">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner  rounded-4">
  <div class="carousel-item active">
    <router-link to="/top/hundred/rating">
      <img style="width: 100%; max-height: 400px; height: 100%;" src="../../assets/a-vivid-image-with-the-inscription-top-100-manga-267733123.png" alt=""/>
      <div class="carousel-caption text-dark d-none d-md-block carousel-caption d-none d-md-block" style="text-align: center;">
        <h5 class="rounded-3" style="background-color: rgba(255, 255, 255, 0.7); width: 40%; margin: 0 auto;">Top 100 manga by estimates</h5>
      </div>
    </router-link>
  </div>

  <div class="carousel-item" >
    <router-link to="/top/hundred/last/rating">
    <img style="width: 100%; max-height: 400px; height: 100%;" src="../../assets/image-with-the-inscription-top-100-manga-666784838.png" alt=""/>
      <div class="carousel-caption text-dark d-none d-md-block carousel-caption d-none d-md-block" style="text-align: center;">
        <h5 class="rounded-3" style="background-color: rgba(255, 255, 255, 0.7); width: 70%; margin: 0 auto;">Top 100 manga according to estimates for the last year</h5>
    </div>
    </router-link>
  </div>
  <div class="carousel-item">
    <router-link to="/top/hundred/coment">
    <img style="width: 100%; max-height: 400px; height: 100%;"
         src="../../assets/image-with-the-inscription-top-100-manga-323302470.png" alt=""/>
      <div class="carousel-caption text-dark d-none d-md-block carousel-caption d-none d-md-block" style="text-align: center;">
        <h5 class="rounded-3" style="background-color: rgba(255, 255, 255, 0.7); width: 60%; margin: 0 auto;">Top 100 manga by number of comments</h5>
    </div>
    </router-link>
  </div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>
</template>
