<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('Painel Administrativo')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/register" :name="$t('Cadastrar Usuário')" icon="tim-icons icon-notes"/>
        <sidebar-link to="/login" :name="$t('Login')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/role" :name="$t('Adicionar Cargo')" icon="tim-icons icon-pencil"/>
        <sidebar-link to="/specialty" :name="$t('Adicionar Especialidade')" icon="tim-icons icon-pencil"/>
        <sidebar-link to="/doctor" :name="$t('Nova Especialidade')" icon="tim-icons icon-shape-star"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
