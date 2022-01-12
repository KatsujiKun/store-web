<template>
        <el-main>
          <el-table :data="tableData" border height="700px">
            <el-table-column prop="id" label="用户编码"></el-table-column>
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="dialogFormVisible = true;showaddressData(scope)" type="text" size="small">查看</el-button>
                    <el-button @click="editEvt(scope)" type="text" size="small" style="margin-right: 12px">编辑</el-button>
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
              <el-descriptions-item label="编码" disabled>{{addressData.id}}</el-descriptions-item>
              <el-descriptions-item label="用户编码" disabled>{{addressData.userID}}</el-descriptions-item>
              <el-checkbox v-model="checked">备选项</el-checkbox>
              <el-descriptions-item label="省">{{addressData.city}}</el-descriptions-item>
              <el-descriptions-item label="市">{{addressData.city}}</el-descriptions-item>
              <el-descriptions-item label="区">{{addressData.city}}</el-descriptions-item>
              <el-descriptions-item label="详细地址">{{addressData.address}}</el-descriptions-item>
              <el-descriptions-item label="开始日期" :span="4">{{addressData.st}}</el-descriptions-item>
              <el-descriptions-item label="结束日期" :span="4">{{addressData.st}}</el-descriptions-item>
              <el-descriptions-item label="备注">{{addressData.remark}}</el-descriptions-item>
            </el-descriptions>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
            </div>
          </el-dialog>
        </el-main>
</template>

<script>
import { getAddressInfo } from '../../apis/userApi'
export default {
  data () {
    return {
      query: [{
        size: 1,
        page: 20
      }],

      tableData: [{
        userID: 'admin17',
        address: '光明小区123号',
      }],

      addressData: {
        id: '',
        userID: '',
        default: true,
        city: '',
        address: '',
        st: '',
        et: '',
        remark: ''
      },
      dialogFormVisible: false,
      total: 0
    }
  },

  created () {
    this.getAddressApi()
  },

  methods: {
    // 获取地址
    getAddressApi () {
      this.tableData = Array.from(Array(60), (_, i) => {
        return { id: 'admin'+i, address: '光明小区123号'}
      })
      this.total = this.tableData.length
    },
    
    // 编辑地址
    editEvt () {

    },

    // 查看详细地址
    showaddressData (scope) {

    },

    // 分页
    handleSizeChange (size) {
      this.query.size = size
      this.getAddressApi()
    },

    handleCurrentChange (page) {
      this.query.page = page
      this.getAddressApi()
    }
  }
}
</script>
