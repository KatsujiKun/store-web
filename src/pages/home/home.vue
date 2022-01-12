<template>
  <div class="container">
    <el-container>
        <el-header style="height: 70px;padding: 0;">
            <el-menu class="el-menu-demo" mode="horizontal" >
                <p class="system-text">浣熊小超管理系统</p>
                <el-menu-item index="1" disabled>处理中心</el-menu-item>
                <el-menu-item index="2" disabled>消息中心</el-menu-item>
                <el-menu-item index="4" @click="logoutEvt">退出登录</el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    default-active="1-4-1"
                    class="el-menu-vertical-demo"
                    :unique-opened="isUnique"
                    >
                    <router-link to="/home">
                        <el-menu-item index="1">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-goods"></i>
                        <span slot="title">商品管理</span>
                    </template>
                    <router-link to="/product/list">
                        <el-menu-item index="2-1">
                                <i class="el-icon-menu"></i>
                                <span slot="title">商品列表</span>
                        </el-menu-item>
                    </router-link>
                    <el-menu-item index="2-2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品编辑</span>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <i class="el-icon-menu"></i>
                        <span slot="title">供应商</span>
                    </el-menu-item>
                    <el-menu-item index="2-4">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页banner</span>
                    </el-menu-item>
                    <el-menu-item index="2-5">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品推荐</span>
                    </el-menu-item>
                    <el-menu-item index="2-6">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品视频</span>
                    </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-s-cooperation"></i>
                    <span slot="title">采购管理</span>
                    </template>
                    <el-menu-item index="3-1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">采购单列表</span>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">采购单编辑</span>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                        <i class="el-icon-menu"></i>
                        <span slot="title">收货单管理</span>
                    </el-menu-item>
                    <el-menu-item index="3-4">
                        <i class="el-icon-menu"></i>
                        <span slot="title">收货单编辑</span>
                    </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">订单管理</span>
                        </template>
                        <el-menu-item index="4-1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">订单列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">会员管理</span>
                        </template>
                        <router-link to="/user/list">
                            <el-menu-item index="5-1">
                                <i class="el-icon-menu"></i>
                                <span slot="title">会员列表</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/user/add">
                            <el-menu-item index="5-2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">会员添加</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/user/role">
                            <el-menu-item index="5-3">
                                <i class="el-icon-menu"></i>
                                <span slot="title">角色管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/user/address">
                            <el-menu-item index="5-4">
                                <i class="el-icon-menu"></i>
                                <span slot="title">用户地址管理</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isUnique: true
    }
  },
  methods: {
    logoutEvt () {
      this.$store.dispatch('common/tokenAct', '')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
    @import url('../../style/common');
</style>
