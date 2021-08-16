<template>
    <div class='container'>
        <h1>周报</h1>
        <rz-radio-group class='radio-view' v-model="username" size="large">
            <rz-radio-button label="孟律"></rz-radio-button>
            <rz-radio-button label="冉旸旸"></rz-radio-button>
            <rz-radio-button label="张义辉"></rz-radio-button>
            <rz-radio-button label="李峙昊"></rz-radio-button>
        </rz-radio-group>
        <mavon-editor v-model="content" />
        <rz-button class='button' size='large' @click="handleSubmit">提交</rz-button>
    </div>
</template>

<script>
import Bmob from "hydrogen-js-sdk"
import _ from 'lodash'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import { sendReport } from 'services'

export default {
    name: 'Home',
    props: {
        msg: String
    },
    components: {
        'mavon-editor': mavonEditor.mavonEditor
    },
    data() {
        return {
            username: '',
            content: ''
        }
    },
    methods: {

        saveData() {
            const query = Bmob.Query('report');
            query.set("name", this.username)
            query.set("content", this.content)
            query.save().then(res => {
                console.log('=====>', res)
            }).catch(err => {
                console.log('------>', err)
            })
        },

        handleSubmit() {
            if (_.isEmpty(this.username)) {
                this.$message.error('请选择用户名')
                return
            }
            if (_.isEmpty(this.content)) {
                this.$message.error('请输入周报内容')
                return
            }

            // sendReport({
            //     "msgtype": "markdown",
            //     "markdown": {
            //         "content": '# 周报 \n ### ' + this.username + '\n' + this.content
            //     }
            // })

            this.saveData()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    padding: 60px;
}

.radio-view {
    margin: 30px 0;
}

.button {
    margin-top: 30px;
}
</style>
