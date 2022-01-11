<template>
      <el-main>
        <el-button type="primary" size="small" @click="dialogFormVisible = true">新增权限</el-button>
        <el-table :data="tableData" border height="700px">
          <el-table-column prop="id" label="权限编码"></el-table-column>
          <el-table-column prop="name" label="权限名称"></el-table-column>
          <el-table-column prop="menu.length" label="权限菜单(/条)"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button @click="dialogFormVisible = true;showRoleList(scope)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form :model="role" :rules="rules" ref="role" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="权限编码" prop="id">
                  <el-input v-model="role.id" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="权限名称" prop="name">
                  <el-input v-model="role.name" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="权限菜单" prop="roleArr">
                  <el-form-item label="商品列表：">
                    <el-checkbox-group v-model="role.roleArr">
                      <el-checkbox label="新建" name="roleArr"></el-checkbox>
                      <el-checkbox label="读取" name="roleArr"></el-checkbox>
                      <el-checkbox label="更新" name="roleArr"></el-checkbox>
                      <el-checkbox label="删除" name="roleArr"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form-item>
              </el-col>
            </el-row>
              <el-form-item>
              <el-button type="primary" @click="submitForm('role')" size="small">立即创建</el-button>
              <el-button @click="dialogFormVisible = false" size="small">取消创建</el-button>
              <el-button @click="resetForm('role')" size="small">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-main>
</template>

<script>
import { getRoleList, getRoleMenuInfo } from '../../apis/userApi'
export default {
  data () {
    return {
      tableData: [{
        id: '',
        name: '',
        menu: '',
        remark: ''
      }],
      title: '编辑权限',
      dialogFormVisible: false,
      role: {
        id: '',
        name: '',
        roleArr: []
      },
      rules: {
        id: [
          { required: true, message: '请输入权限编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '清苦如权限名称', trigger: 'blur' }
        ],
        roleArr: [
          { required: true, message: '请选择权限', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getRoleList()
    this.getRoleMenu()
  },

  methods: {
    // 获取权限列表
    async getRoleList () {
      const result = await getRoleList()
      if (result.code === 200) {
        this.tableData = [...result.data.rows]
      }
    },

    // 获取所有权限菜单
    async getRoleMenu () {
      const result = await getRoleMenuInfo()
      if (result.code === 200) {
        console.log(result)
      }
    },

    // 提交表单
    submitForm (role) {
      this.$refs[role].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    },

    // 重置表单
    resetForm (role) {
      this.$refs[role].resetFields()
    }
  }

}
</script>

<style lang="less" scoped>
.el-button{
  margin-bottom: 12px;
}
.el-col {
  width: auto;
}
</style>
