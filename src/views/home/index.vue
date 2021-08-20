<template>
    <div class='container'>
        <h1>周报</h1>
        <div class="manipulate">
            <rz-radio-group class='radio-view' v-model="username" size="large">
                <rz-radio-button label="孟律"></rz-radio-button>
                <rz-radio-button label="冉旸旸"></rz-radio-button>
                <rz-radio-button label="张义辉"></rz-radio-button>
                <rz-radio-button label="李峙昊"></rz-radio-button>
            </rz-radio-group>
            <rz-button size='large' @click="handleSubmit">提交</rz-button>
        </div>
        <mavon-editor v-model="content" />
        <rz-dialog title="提示" :visible.sync="dialogVisible" body-padding width="30%" v-loading="loading">
            <vue-markdown class="row-item-content">{{ postMsg }}</vue-markdown>
            <span slot="footer" class="dialog-footer">
                <rz-button type="info" @click="cancelSubmit">取 消</rz-button>
                <rz-button type="primary" @click="confirmSubmit">确 定</rz-button>
              </span>
        </rz-dialog>
    </div>
</template>

<script>
import Bmob from "hydrogen-js-sdk"
import _ from 'lodash'
import mavonEditor from 'mavon-editor'
import VueMarkdown from 'vue-markdown'
import 'mavon-editor/dist/css/index.css'
import { sendReport } from 'services'

export default {
    name: 'Home',
    components: {
        'mavon-editor': mavonEditor.mavonEditor,
        'vue-markdown': VueMarkdown
    },
    data() {
        return {
            username: '',
            content: `### 本周完成 
1. ~
2. ~
### 下周计划 
1. ~
2. ~
### 问题/风险 
1. ~
2. ~`,
            postMsg: '',
            dialogVisible: false,
            loading: false
        }
    },
    methods: {

        saveData() {
            const query = Bmob.Query('report');
            query.set("name", this.username)
            query.set("content", this.content)
            query.save().then(res => {
                console.log('=====>', res)
                return null
            }).catch(err => {
                console.log('------>', err)
                return err
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
            // console.log(window.location.origin)
            // window.location.href = window.location.origin + '/record?name=' + this.username
            // return
            // eslint-disable-next-line no-unreachable
            this.postMsg = `[${this.username}的周报](${window.location.origin}/record?name=${this.username}) \n ${this.content}`
            this.dialogVisible = true
        },

        cancelSubmit() {
            this.dialogVisible = false
            this.postMsg = ''
        },

        async confirmSubmit() {

            const res = await sendReport({
                "msgtype": "markdown",
                "markdown": {
                    "content": this.postMsg
                }
            })

            console.log(res)

            this.loading = true
            const err = await this.saveData()
            this.loading = false
            if (err) {
                this.$message.error(err)
            } else {
                this.$message('保存成功')
                this.dialogVisible = false
                this.postMsg = ''
            }
        }


    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    padding: 60px;
}

.manipulate {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.radio-view {
    margin: 30px 0;
}
</style>
