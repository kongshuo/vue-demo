<template>
  <header id="head">
      <slot name="logo"></slot>
      <slot name="login"></slot>
  </header>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
#head{
  height: 90px;
  padding: 0 20px;
  background-color: #3190e8;
  flex-grow: 0;
}
</style>
