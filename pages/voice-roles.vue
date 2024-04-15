<template>
  <div class="w-3/4 md:w-auto flex flex-col items-center mt-16 gap-16 mx-12">
    <span class="text-4xl font-medium tracking-wide font-display animate-light">Voice Roles</span>

    <CoreFeatureBox
      title="Connect voice channels to roles"
      description="With Astro voice roles you can connect any kind of voice channel to a role. This includes voice, stage and even temporary voice channel generators! When a user joins the designed channel, he gets the role you configured!"
      illustration-src="illustration/voice_role.gif"
      :reverse="false"
    />

    <CoreFeatureBox
      title="Custom role action"
      description="You can configure what happens to users that join the voice channel: whether they get the role, lose it or get it toggled!"
      illustration-src="illustration/temp_vc.gif"
      :reverse="true"
    />

    <div
      class="flex flex-col w-full items-center justify-center rounded-md p-6 backlit-box border-box-border bg-background md:max-w-screen-lg"
      @mousemove="onBacklitBoxMouseMove"
    >
      <span class="text-2xl font-medium tracking-wide font-display">Conviced?</span>
      <span class="mt-4 text-secondary">
        It takes just a couple of minutes to get started using Astro, try it now!
      </span>
      <NuxtLink to="/guilds" class="mt-6 w-full button-primary md:w-fit">
        Get started
      </NuxtLink>
    </div>
  </div>
</template>
