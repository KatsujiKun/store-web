<template>
        <el-main>
          <el-input v-model="query.name" size="small" placeholder="请输入用户编码"/>
          <el-button type="primary" size="small" @click="queryUser">查询</el-button>
          <el-table :data="tableData" border height="700px" v-loading="loading">
            <el-table-column prop="id" label="用户编码"></el-table-column>
            <el-table-column prop="name" label="用户姓名"></el-table-column>
            <el-table-column prop="dept" label="部门"> </el-table-column>
            <el-table-column prop="duties" label="职位"> </el-table-column>
            <el-table-column prop="phone" label="电话号码"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="dialogFormVisible = true;showUserData(scope)" type="text" size="small">查看</el-button>
                    <el-button @click="editEvt(scope)" type="text" size="small" style="margin-right: 12px">编辑</el-button>
                      <el-popconfirm
                        icon="el-icon-info"
                        icon-color="red"
                        title="这是一段内容确定删除吗？"
                        confirm-button-type="danger"
                        @confirm="delEvt(scope)">
                        <el-button slot="reference" type="text" size="small">删除</el-button>
                      </el-popconfirm>
                </template>
             </el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
          <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="用户编码">{{userData.id}}</el-descriptions-item>
              <el-descriptions-item label="用户名">{{userData.name}}</el-descriptions-item>
              <el-descriptions-item label="性  别">{{userData.sex}}</el-descriptions-item>
              <el-descriptions-item label="联系方式">{{userData.phone}}</el-descriptions-item>
              <el-descriptions-item label="出生日期">{{userData.birthday}}</el-descriptions-item>
              <el-descriptions-item label="居住地" :span="4">{{userData.address}}</el-descriptions-item>
              <el-descriptions-item label="部  门" :span="1">{{userData.dept}}</el-descriptions-item>
              <el-descriptions-item label="职  位" :span="1">{{userData.duties}}</el-descriptions-item>
              <el-descriptions-item label="备注">{{userData.remark}}</el-descriptions-item>
            </el-descriptions>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
            </div>
          </el-dialog>
        </el-main>
</template>

<script>
import { userListApi, delUser } from '../../apis/userApi'
export default {
  data () {
    return {
      loading: true,
      total: 0,
      query: {
        id: '',
        name: '',
        page: 1,
        size: 20
      },

      tableData: [{
        id: '',
        name: '',
        dept: '',
        duties: '',
        phone: '',
        address: ''
      }],

      isUnique: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      userData: {
        id: '007',
        name: '王小虎',
        sex: '男',
        address: '苏州',
        birthday: '2020-2-16',
        dept: '开发布',
        duties: '前端工程师',
        phone: '10000000000000000',
        email: '1244131216@qq.com',
        remark: '无'
      }
    }
  },

  created () {
    this.userListApi()
  },

  methods: {
    // 获取用户列表
    async userListApi () {
      const result = await userListApi(this.query)
      if (result.code === 200) {
        this.tableData = result.data.rows
        this.total = result.data.total
        this.loading = false
      }
    },

    // 查询用户
    queryUser () {
      this.userListApi()
    },

    // 分页
    handleSizeChange (size) {
      this.query.size = size
      this.userListApi()
    },

    handleCurrentChange (page) {
      this.query.page = page
      this.userListApi()
    },

    // 查看用户信息
    async showUserData ({ row }) {
      this.userData = { ...row }
    },

    // 编辑用户信息
    editEvt ({ row }) {
      const userID = { id: row.id }
      this.$router.push({
        path: '/user/edit',
        query: userID
      })
    },

    // 删除用户信息
    async delEvt ({ row }) {
      const result = await delUser(row.id)
      if (result.code === 200) {
        this.$message({
          showClose: true,
          message: '删除用户成功',
          type: 'success'
        })
        this.userListApi()
      } else {
        this.$message({
          showClose: true,
          message: '删除用户失败',
          type: 'error'
        })
      }
    },

    logoutEvt () {
      this.$store.dispatch('common/tokenAct', '')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../style/common");
</style>
