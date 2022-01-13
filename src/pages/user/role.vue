<template>
      <el-main>
        <el-button type="primary" ref="scpoe" size="small" @click="dialogFormVisible=true;showRoleList">新增权限</el-button>
        <el-table :data="tableData" border height="700px" v-loading="loading">
          <el-table-column prop="id" label="权限编码"></el-table-column>
          <el-table-column prop="name" label="权限名称"></el-table-column>
          <el-table-column prop="menu.length" label="权限菜单(/条)"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button @click="dialogFormVisible=true;showRoleList(scope)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-dialog
          :title="title"
          :visible.sync="dialogFormVisible"
          top="10vh"
          destroy-on-close
          custom-class="mask">
          <el-form :model="role" :rules="rules" ref="role" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
              <el-col :span="11">
                <el-form-item label="权限编码" prop="id">
                  <el-input v-model="role.id" size="small" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="权限名称" prop="name">
                  <el-input v-model="role.name" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="权限菜单">
                  <el-form-item
                    v-for="item in roleList"
                    :key="item.name"
                    :label="item.name">
                    <el-checkbox-group  v-model="item.temp">
                      <el-checkbox
                        :value="it.temp"
                        :label="it"
                        v-for="it in item.right"
                        :key="it"/>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    v-model="tableData.remark">
                  </el-input>
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
import { getRoleList } from '../../apis/userApi'
export default {
  data () {
    return {
      loading: true,
      dialogFormVisible: false,
      tableData: [{
        id: '',
        name: '',
        menu: '',
        remark: ''
      }],
      title: '新建权限',
      role: {
        id: '',
        name: '',
        remark: '',
        menu: []
      },
      roleList: [
        { temp: [], name: '商品列表', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '商品编辑', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '供应商', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '首页banner', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '商品推荐', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '商品视频', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '采购单列表', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '采购单编辑', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '收货单管理', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '收货单编辑', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '订单列表', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '用户列表', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '用户编辑', right: { C: '新建', U: '更新' } },
        { temp: [], name: '用户角色', right: { C: '新建', R: '读取', U: '更新' } },
        { temp: [], name: '用户地址', right: { C: '新建', R: '读取', U: '更新', D: '删除' } },
        { temp: [], name: '用户优惠', right: { C: '新建', R: '读取', U: '更新', D: '删除' } }],
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
  },

  methods: {
    // 获取权限列表
    async getRoleList () {
      const result = await getRoleList()
      if (result.code === 200) {
        this.tableData = [...result.data.rows]
        this.loading = false
      }
    },

    // 判断编辑权限
    showRoleList ({ row }) {
      this.title = '编辑权限'
      this.role = { ...row }
      const roleArr = row.menu.map(it => {
        return (it.slice(it.indexOf('>') + 3)).split('')
      })

      for (let j = 0; j < this.roleList.length; j++) {
        this.roleList[j].temp = roleArr[j] || []
      }
      console.log(this.roleList)
    },
    // // 判断编辑权限
    // showRoleList ({ row }) {
    //   console.log(row)
    //   const userData = !!row
    //   if (!row) {
    //     this.title = '新建权限'
    //   } else {
    //     this.title = '编辑权限'
    //     this.role = { ...row }
    //   }
    // },

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
@import url('../../style/');
  .el-button{
    margin-bottom: 12px;
  }
  .el-col {
    width: 100%;
  }
  .el-dialog__wrapper{
    overflow: auto;
  }
/deep/.el-dialog {
    overflow-y: auto;
    height: 80%;
  }
</style>
