<template>
  <div id="ct-title" v-bind:style="boxStyle">
    <div v-if="showControl" class="wrap ct-control">
      <button>X</button>
    </div>

    <pre class="wrap ct-code" v-if="showCode">{{ codePre }}</pre>
    <slot></slot>
    <pre class="wrap ct-code" v-if="showCode">{{ codePost }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Title',

  data: function () {
    return {
      size: 'A5',
      padding: '5mm'
    }
  },

  computed: {
    boxStyle: function () {
      var style = {}

      return style
    },

    showControl: function () {
      return true
    },

    showCode: function () {
      return true
    },

    codePre: function () {
      return '\\title{'
    },
    codePost: function () {
      return '}'
    }
  }
}
</script>

<style>
#ct-title {
  text-align: center;
  font-size: 32pt;
}

.wrap {
  display: inline;
}

</style>
