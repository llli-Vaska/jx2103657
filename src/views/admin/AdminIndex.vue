<template>
  <a-layout id="components-layout-demo-custom-trigger" style="position:absolute;height: 100%;width: 100%">
                    <!--  aside  -->
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible >
      <div class="logo">
        <span>
          <img class="logoimg" src="@/assets/img/logo.png" alt="">
          <span class="logo-title">招聘管理后台</span>
        </span>
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['sub1']">
        <a-menu-item key="1">
          <a-icon type="home" />
          <span>首页</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>用户管理</span></span>
          <a-menu-item key="3">学生管理</a-menu-item>
          <a-menu-item key="4">企业管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="edit" /><span>信息发布</span></span>
          <a-menu-item key="5">宣讲会信息发布</a-menu-item>
          <a-menu-item key="6">招聘会信息发布</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="2">
          <a-icon type="file-search" />
          <span>招聘信息审核</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout >
                      <!--   header   -->
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
        />
          <a-dropdown class="logoout">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              admin <a-icon type="down" />
            </a>
            <a-menu slot="overlay">

                <a-menu-item>
                    <a href="javascript:;" @click="logout()">退出</a>
                </a-menu-item>


            </a-menu>
          </a-dropdown>
      </a-layout-header>
                        <!--  body   -->
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: "AdminIndex",
  data() {
    return {
      collapsed: false,

    };
  },
  methods:{
      logout(){
        //清空token
        window.localStorage.clear()

        //跳转到登录页
        this.$router.push('/')

        window.location.reload()
      }
  },
};
</script>
<style>
/*.container {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  background-color: #4A70DE;*/
/*  position: absolute;*/
/*}*/
.logoout {
  position: absolute;
  right: 20px;
}
.logoimg {
  height:30px;
  margin-right:3px;

}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  /*background: rgba(255, 255, 255, 0.2);*/
  margin: 16px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

</style>
