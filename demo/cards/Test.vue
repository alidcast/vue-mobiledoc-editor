<template>
<div class="test-card">
  <h1> Test passed! </h1>
</div>
</template>

<script>
export default {
  name: 'test',
  props: ['env'],
  created() {
    console.log(this.env)
  }
}
</script>
