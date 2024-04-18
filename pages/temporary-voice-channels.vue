<template>
  <div class="w-3/4 md:w-auto flex flex-col items-center mt-16 gap-16 mx-12">
    <span class="text-title"><span class="animate-dissolve">Temporary </span>Voice Channels</span>

    <CoreFeatureBox
      title="Full customisation"
      description="Use Astro's extremely powerful dashboard to customise the aspect and behaviour of temporary voice channels! Includes but not limited to: name, user limit, category, permissions, channel position, bitrate, region and so much more!"
      illustration-src="illustration/temp_vc.gif"
      :reverse="false"
    />

    <CoreFeatureBox
      title="Private text chats"
      description="Voice channels are not enough for your use case? No worries, Astro can also attach a temporary text channel to them, fully customisable as well of course!"
      illustration-src="illustration/temp_vc.gif"
      :reverse="true"
    />

    <CoreFeatureBox
      title="Beatiful interface"
      description="Astro ships with a beatiful default interface which makes it easy for mobile users to manage their private channel!"
      illustration-src="illustration/temp_vc.gif"
      :reverse="false"
    />

    <CoreFeatureBox
      title="But also customisable"
      description="Astro interfaces are fully customisable down to the last pixel, make it look exactly how you need, imagination is your only limit!"
      illustration-src="illustration/custom_interface.png"
      :reverse="true"
    />

    <CoreFeatureBox
      title="Powerful template system"
      description="Templates allows you to have standard channel configurations that can be switched with the click of a button! They basically group together channel settings and apply them all at once!"
      illustration-src="illustration/temp_vc.gif"
      :reverse="false"
    />

    <div
      class="flex flex-col w-full items-center justify-center rounded-md p-6 backlit-box border-box-border bg-background md:max-w-screen-lg"
      @mousemove="onBacklitBoxMouseMove"
    >
      <span class="text-2xl font-medium tracking-wide font-display">Conviced?</span>
      <span class="mt-4 text-secondary">
        It takes just a couple of minutes to get started using Astro, try it now!
      </span>
      <NuxtLink to="/guilds" class="mt-6 w-full button-primary-bordered md:w-fit">
        Get started
      </NuxtLink>
    </div>
  </div>
</template>
