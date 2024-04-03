<template>
   <div class="flex min-h-screen items-center justify-center">
    <UtilCircularLoading />
  </div>
  </template>
  
  <script setup>
  import { redirects } from "../assets/config/redirects";
  import { nextTick } from "vue";
  
  const route = useRoute();
  const redirect = redirects.find(
      (redirect) => redirect.id === route.params.redirect.toLowerCase()
  );
  const pageContent = redirect
      ? `Redirecting to ${redirect.name}`
      : "404 - Not found";
  
  useHead({
      title: pageContent,
      meta: [{ name: "title", content: pageContent }],
  });
  
  onMounted(() => {
      // Guarantees the DOM tree to be fully built
      nextTick(() => {
          if (redirect) {
              setTimeout(() => {
                  try {
                      location.replace(redirect.url);
                      // eslint-disable-next-line no-empty
                  } catch (error) {}
              }, 250);
          }
      });
  });
  </script>
  