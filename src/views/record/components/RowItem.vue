<template>
    <div class="row-item">
        <div class="row-item-title">{{ index + 1 }}. {{ source.name }}</div>
        <vue-markdown class="row-item-content">{{ source.content }}</vue-markdown>
        <div class='row-item-line' />
        <div class="row-item-date">{{ source.createdAt }}</div>
    </div>
</template>
 
<script>
import VueMarkdown from 'vue-markdown'

export default {
    name: 'item-component',
    props: {
        index: { // index of current item
            type: Number
        },
        source: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        'vue-markdown': VueMarkdown
    }
}
</script>

<style scoped>
.row-item {
    display: flex;
    flex-direction: column;
    width: 600px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 30px;
    margin: 30px;
}
.row-item-line {
  width: 100%;
  height: 1px;
  background: #ccc;
  align-self: center;
}
.row-item-title {
  padding: 10px 0;
  font-weight: bold;
  color: #4b9ee6;
  font-size: 30px;
}
.row-item-content {
  padding: 10px 0 20px 0;
}
.row-item-date {
  padding-top: 30px;
  font-weight: bold;
  text-align: right;
}
</style>