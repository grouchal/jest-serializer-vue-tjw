<template>
  <div :title="first" data-test="div">
    <h1
      :title="['asdf', 'qwer']"
      class="active"
      data-test="h1"
    >
      text
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ObjectAttribute',
  data: function () {
    return {
      first: {
        a: true,
        b: 'Some \"text\"',
        c: {
          d: {
            e: '23'
          },
          f: '\"\'\"\''
        }
      }
    };
  }
};
</script>
