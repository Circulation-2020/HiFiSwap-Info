<template>
  <span v-clipboard:copy="text" @click="onCopy()" class="btn-copy">
    <span v-if="!status_on_copied">Copy</span>
    <span v-if="status_on_copied">Copied</span>
  </span>
</template>

<script>

export default {
  name: "copyBtn",
  components: {},
  props: ["text"],
  data: function() {
    return {
      status_on_copied: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onCopy: function() {
      var t = this;
      t.status_on_copied = true,
      setTimeout((function() {
        t.status_on_copied = false
      }
      ), 600)
    }
  },
  created: function() {}
};
</script>

<style lang="scss" scoped>
  
</style>