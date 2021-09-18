<template>
    <div>
        <div id='test' />
    </div>
</template>

<script>

import Chess from './components/chess'

export default {
    name: 'SvgDemo',
    mounted() {
        // eslint-disable-next-line no-debugger
        // debugger
        const chess = new Chess('#test')
        chess.initialChess()
        console.log(chess)
    },
    methods: {

    }
}
</script>
