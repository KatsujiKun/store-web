<template>
        <el-main>
          <el-input v-model="query.name" size="small" placeholder="请输入商品编码"></el-input>
          <el-button type="primary" size="small" @click="queryUser">查询</el-button>
          <el-table :data="tableData" border height="700px" v-loading="loading">
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="商品价格"> </el-table-column>
            <el-table-column prop="discount" label="优惠价格"> </el-table-column>
            <el-table-column prop="st" label="开始预售时间"> </el-table-column>
            <el-table-column prop="et" label="预售结束时间"> </el-table-column>
            <el-table-column prop="supplier" label="供应商"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="dialogFormVisible = true;showUserData(scope)" type="text" size="small">查看</el-button>
                    <el-button @click="editEvt" type="text" size="small" style="margin-right: 12px">编辑</el-button>
                      <el-popconfirm
                        icon="el-icon-info"
                        icon-color="red"
                        title="这是一段内容确定删除吗？"
                        confirm-button-type="danger"
                        @confirm="delEvt(scope)"
                      >
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
            <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
              <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="商品编码">{{paroductData.id}}</el-descriptions-item>
                <el-descriptions-item label="商品名称">{{paroductData.name}}</el-descriptions-item>
                <el-descriptions-item label="商品类型">{{paroductData.type}}</el-descriptions-item>
                <el-descriptions-item label="商品规格">{{paroductData.specs}}</el-descriptions-item>
                <el-descriptions-item label="商品价格">{{paroductData.price}}</el-descriptions-item>
                <el-descriptions-item label="优惠价格">{{paroductData.discount}}</el-descriptions-item>
                <el-descriptions-item label="开始优惠时间">{{paroductData.st}}</el-descriptions-item>
                <el-descriptions-item label="结束优惠时间">{{paroductData.et}}</el-descriptions-item>
                <el-descriptions-item label="供应商">{{paroductData.supplier}}</el-descriptions-item>
                <el-descriptions-item label="供应商编码">{{paroductData.supplierId}}</el-descriptions-item>
                <el-descriptions-item label="备注">{{paroductData.remark}}</el-descriptions-item>
              </el-descriptions>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
              </div>
          </el-dialog>
        </el-main>
</template>

<script>
import { getProductList } from '../../apis/productApi'
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

      tableData: [
        {
          name: '',
          price: '',
          discount: '',
          st: '',
          et: '',
          supplier: '',
          remark: ''
        }],

      isUnique: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      paroductData: {
        id: '',
        name: '',
        price: '',
        discount: '',
        type: '',
        specs: '',
        st: '',
        et: '',
        supplier: '',
        supplierId: '',
        remark: ''
      }
    }
  },

  created () {
    this.getProductList()
  },

  methods: {
    // 日期格式化
    dataFormd () {

    },

    // 获取商品列表
    async getProductList () {
      const result = await getProductList(this.query)
      if (result.code === 200) {
        this.tableData = result.data.rows
        this.total = result.data.total
        this.loading = false
      }
    },

    // 查询商品
    queryUser () {
      this.getProductList()
    },

    // 分页
    handleSizeChange (size) {
      this.query.size = size
      this.getProductList()
    },

    handleCurrentChange (page) {
      this.query.page = page
      this.getProductList()
    },

    // 查看商品信息
    async showUserData ({ row }) {
      this.paroductData = { ...row }
    },

    // 编辑商品信息
    editEvt () {

    },

    // 删除商品信息
    // async delEvt ({ row }) {
    //   const result = await delUser(row.id)
    //   if (result.code === 200) {
    //     this.$message({
    //       showClose: true,
    //       message: '删除用户成功',
    //       type: 'success'
    //     })
    //     this.getUserList()
    //   } else {
    //     this.$message({
    //       showClose: true,
    //       message: '删除用户失败',
    //       type: 'error'
    //     })
    //   }
    // },

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
