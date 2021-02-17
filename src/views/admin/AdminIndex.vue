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
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <router-link to='/admin'>
          <a-icon type="home" />
          <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>用户管理</span></span>
          <a-menu-item key="3"><router-link to='/admin/StManage'>学生管理</router-link></a-menu-item>
          <a-menu-item key="4"><router-link to='/admin/BuManage'>企业管理</router-link></a-menu-item>

        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="edit" /><span>信息发布与管理</span></span>
          <a-menu-item key="5"><router-link to='/admin/PlManage'>宣讲会信息管理</router-link></a-menu-item>
          <a-menu-item key="6"><router-link to='/admin/JfManage'>招聘会信息管理</router-link></a-menu-item>
          <a-menu-item key="7"><router-link to='/admin/PlPublish'>宣讲会信息发布</router-link></a-menu-item>
          <a-menu-item key="8"><router-link to='/admin/JfPublish'>招聘会信息发布</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="file-search" /><span>招聘信息审核</span></span>
          <a-menu-item key="1"><router-link to='/admin/JfExamine'>信息审核</router-link></a-menu-item>
        </a-sub-menu>

      </a-menu>
    </a-layout-sider>
    <a-layout >
                      <!--   header   -->
      <a-layout-header style="background-color: #001529; padding: 0;">
        <a-icon
            style="color: #FFFFFF"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
        />
          <a-dropdown class="logoout" >
            <a class="ant-dropdown-link" @click="e => e.preventDefault()" style="color: #FFFFFF">
              admin <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
                <a-menu-item>
                    <a href="javascript:" @click="logout()">退出</a>
                </a-menu-item>
            </a-menu>
          </a-dropdown>
      </a-layout-header>
                        <!--  body   -->
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>

export default {
  name: "AdminIndex",
  comments: {
  },
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
  mounted() {
    // 当页面刷新时，指定回到首页路径
    window.addEventListener('load', () => {
      if (this.$route.path !== '/admin') { // admin表示后台首页
        this.$router.replace('/admin') // 切换到首页
      }
    })

  }
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
  position: relative;
  left: 87%;
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
