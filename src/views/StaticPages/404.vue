<template>
  <div class="notFound">
    <div class="content">
      <h1>Oops !</h1>
      <p>Nous ne trouvons pas cette page.</p>
      <div class="image">
        <img src="../../assets/image/404-error-dark.png" alt="404" />
      </div>
      <router-link to="/" class="btn">Accueil</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notFound {
  min-height: 100vh;
  background-image: url(../../assets/background/bg8.jpg);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  @media screen and (max-width: $phone) {
    width: 275px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 600px;
  padding: 3rem 2.25rem;
  border-radius: 0.625rem;
  background-color: $dark;

  h1 {
    font-size: calc(1.375rem + 1.5vw);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-weight: 500;
    font-size: 1rem;
    color: #565674;
    margin-bottom: 1.75rem;
  }

  .image {
    @media screen and (max-width: $phone) {
      width: 260px;
      height: 260px;
    }
    width: 300px;
    height: 300px;
    margin-bottom: 0.75rem;

    img {
      width: 100%;
    }
  }

  .btn {
    text-decoration: none;
    color: #fff;
    padding: 8px 16px;
    background-color: $blue;
    border-radius: 0.425rem;

    &:hover {
      background-color: $black;
    }
  }
}
.dark {
  .notFound {
    background-image: url(../../assets/background/bg8-dark.jpg);
  }

  .content {
    background-color: #1e1e2d;

    p {
      color: $grey;
    }
  }
}
</style>
