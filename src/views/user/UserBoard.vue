<template>
  <NavbarFront />
  <div class="HomeView">
    <RouterView />
    <SmallSidebar />
  </div>
  <FooterFront />
</template>

<script setup>
import NavbarFront from '@/components/NavbarFront.vue'
import FooterFront from '@/components/FooterFront.vue'
import SmallSidebar from '@/components/SmallSidebar.vue'
</script>
