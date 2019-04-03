<template>
  <div id="ct-doc" v-bind:style="boxStyle">
    <div v-if="showControl" class="ct-control">
      <label>Page Size </label>
      <select v-model="size">
        <option value="A4">A4</option>
        <option value="A5">A5</option>
      </select>

      <span> | </span>

      <label>Padding </label>
      <select v-model="padding">
        <option value="5mm">Narrow</option>
        <option value="15mm">Wide</option>
      </select>
    </div>

    <pre class="ct-code" v-if="showCode">{{ codePre }}</pre>

    <slot></slot>

    <pre class="ct-code" v-if="showCode">{{ codePost }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Document',

  data: function () {
    return {
      size: 'A5',
      padding: '5mm'
    }
  },

  computed: {
    boxStyle: function () {
      var style = {}
      switch (this.size) {
        case 'A4':
          style.width = '210mm'
          style.height = '297mm'
          break
        case 'A5':
          style.width = '148.5mm'
          style.height = '210mm'
          break
      }

      style.padding = this.padding

      return style
    },

    showControl: function () {
      return true
    },

    showCode: function () {
      return true
    },

    codePre: function () {
      return '\\documentclass{article}\n\\begin{document}'
    },
    codePost: function () {
      return '\\end{document}'
    }
  }
}
</script>

<style>
#ct-doc {
  background-color: #fff;
  text-align: left;
}

.ct-control,
.ct-code {
  padding: 3pt;
  margin: 4pt;
  border-radius: 3pt;
  font-family: monospace;
}

.ct-code {
  background-color: #e0e0e0;
  color: #a0a0a0;
}
.ct-control {
  background-color: #f0f0f0;
  border: #a0a0a0 solid 1pt;
  color: #a0a0a0;
  font-weight: bold;
}

</style>
