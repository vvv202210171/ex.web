<template>
  <div class="pdf">
    <iframe :src="url" type="application/x-google-chrome-pdf" width="100%" height="100%" />
  </div>
</template>

<script>
import pdf from '@/assets/file/whitePaper.pdf'
export default {
  name: 'whitePaper',
  data() {
    return {
      url: pdf
    }
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

.pdf {
  height: 100vh;
  position: relative;
}
</style>
