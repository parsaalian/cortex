<template>
  <div id="app">
  <Document>
    <Title>
    </Title>
  </Document>
  </div>
</template>

<script>
import Document from './components/CorTeX/Document'
import Title from './components/CorTeX/Title'

export default {
  name: 'App',
  components: { Title, Document }
}
</script>

<style>

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #e0e0e0;
  padding-top: 3em;
  padding-bottom: 2em;
}

</style>
