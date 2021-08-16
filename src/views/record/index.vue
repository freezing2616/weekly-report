<template>
    <div class='container'>
        <virtual-list class="list" :data-key="'objectId'" :data-sources="dataSource" :data-component="itemComponent" />
    </div>
</template>

<script>
import Bmob from 'hydrogen-js-sdk'
import RowItem from './components/RowItem'
import VirtualList from 'vue-virtual-scroll-list'
import queryString from 'query-string'

export default {
    name: 'Record',
    components: {
        'virtual-list': VirtualList
    },
    data() {
        return {
            itemComponent: RowItem,
            dataSource: []
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const params = queryString.parse(location.search)
            console.log(params)
            const query = Bmob.Query('report')
            query.equalTo('name', '==', params.name)
            query.order('-createdAt')
            const res = await query.find()
            console.log(res)
            this.dataSource = res
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.list {
    height: 100%;
    overflow-y: auto;
}
</style>