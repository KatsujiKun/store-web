<template>
    <div>
        <el-row :gutter="20" style="margin-right: 0px">
            <el-col :span="6" :offset="9">
                <p>登录页面</p>
                <el-input type="text" v-model="loginObj.id" placeholder="请输入用户名" />
                <el-input type="password" v-model="loginObj.password" placeholder="请输入用户密码" />
                <el-col :span="12" :offset="9">
                    <el-button
                      type="primary"
                      v-loading.fullscreen.lock="fullscreenLoading"
                      :plain="true"
                      @click="login">
                      登录
                    </el-button>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { loginApi } from '../../apis/userApi'
import { MD5 } from 'crypto-js'

export default {
  data () {
    return {
      loginObj: {
        id: '007',
        password: '123456'
      },
      fullscreenLoading: false
    }
  },

  methods: {
    async login () {
      this.fullscreenLoading = true
      const result = await loginApi({
        id: this.loginObj.id,
        password: MD5(this.loginObj.password).toString()
      })
      if (result.code === 200) {
        this.$message({
          showClose: true,
          message: `欢迎回来，${result.data.id}`,
          type: 'success'
        })
        this.$store.dispatch('common/tokenAct', result.data.token)
        this.$router.push('/home')
      } else {
        this.$message({
          showClose: true,
          message: '用户名或密码错误，请联系管理员进行修改',
          type: 'error'
        })
      }
      this.fullscreenLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../../style');
   div{
    .el-col{
      margin-right: 0px;
      >p{
        text-align: center;
      }
      >.el-input{
        margin-bottom: 12px;
      }
    }
   }
</style>
