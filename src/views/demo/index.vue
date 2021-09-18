<template>
    <rz-button @click="handleClick">Plus One</rz-button>
</template>

<script>
import hookDemo from '../../utils/hooks.js'
import 'mavon-editor/dist/css/index.css'

export default {
    name: 'Demo',
    methods: {

        handleClick() {
            hookDemo.onClick()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
