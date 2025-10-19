<template>
  <section class="social-footer text-theme-header-text">
    <a
      href="https://github.com/melaku-z/ethio-european-date-converter.git"
      class="social-link"
    >
      <img
        src="@fortawesome/fontawesome-free/svgs/brands/github.svg"
        alt="Github"
        width="496"
        height="512"
        loading="lazy"
      />
      View on Github
    </a>

    <a
      href="https://www.linkedin.com/in/melakuzewduasefa/"
      class="social-link linkedin-link"
    >
      <img
        src="@fortawesome/fontawesome-free/svgs/brands/linkedin.svg"
        alt="LinkedIn"
        width="448"
        height="512"
        loading="lazy"
      />

      Find me on LinkedIn
    </a>
  </section>
</template>

<style scoped lang="postcss">
@reference "../assets/main.css";

.social-footer {
  @apply mx-auto flex flex-wrap w-10/12 mb-8;
  background-color: rgb(221, 217, 226);
  .social-link {
    @apply flex p-4 w-full sm:w-1/2;
  }
  .linkedin-link {
    border: 1px solid rgba(86, 61, 124, 0.2);
  }
  img {
    @apply mr-2 my-auto;
    max-height: 1.3rem;
    max-width: 1.3rem;
  }
}
@media (prefers-color-scheme: dark) {
  .social-footer {
    background-color: rgb(43, 46, 48);
  }
}
</style>
