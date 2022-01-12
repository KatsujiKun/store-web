<template>
  <el-main>
      <el-form
        :model="userData"
        :rules="rules"
        ref="userData"
        label-width="100px"
        class="demo-ruleForm"
        v-loading="loading">
        <el-form-item label="用户编码" prop="id">
            <el-input v-model="userData.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
            <el-input v-model="userData.name"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="sex">
            <el-select v-model="userData.sex" placeholder="请选择用户性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            </el-select>
        </el-form-item>
            <el-form-item label="用户手机" prop="phone">
            <el-input v-model="userData.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item label="用户地址" prop="address">
            <el-input v-model="userData.address"></el-input>
        </el-form-item>
        <el-form-item label="用户部门" prop="dept">
          <el-select v-model="userData.dept" placeholder="请选择用户部门">
            <el-option
              v-for="item in deptList"
              :key="item.name"
              :label="item.name"
              :value="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="用户部门" prop="dept">
          <el-select v-model="userData.duties" placeholder="请选择用户职位">
            <el-option
              v-for="item in dutiesList"
              :key="item"
              :label="item"
              :value="item"
             />
          </el-select>
        </el-form-item>
        <el-form-item label="用户权限" prop="role">
            <el-checkbox-group v-model="userData.role">
            <el-checkbox
              v-for="item in roleList"
              :key="item.name"
              :label="item.name"
              :name="item.name" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
            <el-input type="textarea" v-model="userData.remark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('userData')">修改用户</el-button>
            <el-button type="primary" @click="backConfirm()">返回</el-button>
            <el-button @click="resetForm('userData')">重置</el-button>
        </el-form-item>
        </el-form>
  </el-main>
</template>

<script>
import { getUserInfo, getRoleInfo, getDeptInfo, updatedUserData } from '../../apis/userApi'
export default {
  data () {
    return {
      loading: true,
      userData: {
        id: '',
        name: '',
        password: '',
        sex: '',
        address: '',
        birthday: Date,
        dept: '',
        duties: '',
        phone: '',
        email: '',
        token: '',
        role: [],
        remark: ''
      },
      deptList: [],
      dutiesList: [],
      roleList: [],
      rules: {
        id: [
          { required: true, message: '请输入用户编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ]
      }
    }
  },

  watch: {
    'userData.dept' (newValue) {
      const list = (this.deptList.find(it => it.name === newValue) || { list: [] }).list
      this.dutiesList = list
    }
  },

  created () {
    this.getDeptList()
    this.getRoleList()
    this.getUserData()
  },

  methods: {
    // 提交表单
    submitForm (userData) {
      this.$refs[userData].validate((valid) => {
        if (valid) {
          this.updateData()
        } else {
          return false
        }
      })
    },

    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 获取用户信息
    async getUserData () {
      const resule = await getUserInfo(this.$route.query.id)
      if (resule.code === 200) {
        this.userData = { ...resule.data }
        this.loading = false
      }
    },

    // 获取部门列表
    async getDeptList () {
      const result = await getDeptInfo()
      if (result.code === 200) {
        this.deptList = result.data
      }
    },

    // 获取权限列表
    async getRoleList () {
      const result = await getRoleInfo()
      if (result.code === 200) {
        this.roleList = result.data.rows
      }
    },

    // 保存用户信息
    async updateData () {
      const result = await updatedUserData(this.userData)
      if (result.code === 200) {
        this.$message({
          showClose: true,
          message: '用户修改成功',
          type: 'success'
        })
        this.$router.push('/user/list')
      } else {
        this.$message({
          showClose: true,
          message: '用户修改失败',
          type: 'error'
        })
      }
    },

    // 返回确认
    backConfirm () {
      this.$confirm('此操作将不会保存修改信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/user/list')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}

</script>
