<script lang="ts" setup>

</script>

<template>
  <div class="w-3/4 md:w-auto flex flex-col items-center mt-16 gap-16 mx-12">
    <span class="text-title">Astro Ultimate</span>

    <CoreFeatureBox
      title="Ultimate Server"
      description="Have a professional server and need to take it to the next level? Astro Ultimate is the right choice for your server then!"
      illustration-src="illustration/voice_role.gif"
      :reverse="false"
      button-text="Get Ultimate for your server"
      button-to="/ultimate/server"
      button-style-classes="button-primary-bordered"
    />

    <CoreFeatureBox
      title="Ultimate User"
      description="Wanna get the best Astro experience in any server that uses it? Become an Ultimate user now and enjoy personal premium features!"
      illustration-src="illustration/temp_vc.gif"
      :reverse="true"
      button-text="Become an Ultimate user"
      button-to="/ultimate/user"
      button-style-classes="button-primary-bordered"
    />
  </div>
</template>
