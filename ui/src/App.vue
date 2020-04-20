<template>
  <v-app>
    <Navbar />
      <v-content>
        <CanvasToggle />
      </v-content>
    <Footer />
  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
  import CanvasToggle from "./pages/CanvasToggle";

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    CanvasToggle
  }
}
</script>
