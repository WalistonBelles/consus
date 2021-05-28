<template>
  <nav class="navbar navbar-expand-lg navbar-absolute" :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button"
              @click="toggleMenu"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation-index"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
            <div v-if="usuario == undefined" class="search-bar input-group" @click="loginModalVisible = true">
              <button class="btn btn-link" id="search-button" data-toggle="modal" data-target="#searchModal">
                <i class="tim-icons icon-button-power"></i>
              </button>
            </div>
            <modal :show.sync="loginModalVisible"
                body-classes="p-0"
                modal-classes="modal-sm"
                id="loginModal"
                :show-close="true">
              <card type="secondary"
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0 mb-0">
                  <template>
                      <div class="text-muted text-center mb-3">
                          <small>Sign in with</small>
                      </div>
                      <div class="btn-wrapper text-center">
                          <base-button type="default">
                              <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/github.svg">
                              Github
                          </base-button>

                          <base-button type="danger">
                              <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/google.svg">
                              Google
                          </base-button>
                      </div>
                  </template>
                  <template>
                    <div class="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                    </div>
                    <form role="form">
                        <base-input alternative
                                      class="mb-3"
                                      placeholder="Email"
                                      addon-left-icon="ni ni-email-83" v-model="email">
                        </base-input>
                        <base-input alternative
                                      type="password"
                                      placeholder="Password"
                                      addon-left-icon="ni ni-lock-circle-open" v-model="password">
                        </base-input>
                        <base-checkbox>
                            Lembrar-me
                        </base-checkbox>
                        <div v-if="error != undefined">
                            <base-alert type="warning">
                                <strong>Alerta!</strong> {{error}}!
                            </base-alert>
                        </div>
                        <div class="text-center">
                            <base-button type="success" class="my-4" @click="login">Acessar</base-button>
                        </div>
                    </form>
                  </template>
              </card>
            </modal>
            <base-dropdown tag="li"
                           :menu-on-right="!$rtl.isRTL"
                           title-tag="a"
                           class="nav-item"
                           menu-classes="dropdown-navbar">
              <a slot="title" href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true">
                <div class="photo">
                  <img src="img/anime3.png">
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">
                  Log out - KS
                </p>
              </a>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Perfil</a>
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Configurações</a>
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item" @click="logout">Sair</a>
              </li>
            </base-dropdown>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>
<script>

import { CollapseTransition } from 'vue2-transitions';
import Modal from '@/components/Modal';
import BaseAlert from "@/components/BaseAlert";
import BaseButton from "@/components/BaseButton";
import axios from 'axios';

  export default {
    created(){
      if (localStorage.getItem('usuario') != undefined){
        this.usuario = localStorage.getItem('usuario');
      }else {
        this.usuario = undefined;
      }
    },
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchModalVisible: false,
        loginModalVisible: false,
        searchQuery: '',
        password: '',
        email: '',
        error: undefined,
        usuario: undefined
      };
    },
    components: {
      BaseAlert,
      BaseButton,
      CollapseTransition,
      Modal
    },
    computed: {
      routeName() {
        const { name } = this.$route;
        return this.capitalizeFirstLetter(name);
      },
      isRTL() {
        return this.$rtl.isRTL;
      }
    },
    methods: {
      login(){
        axios.post("http://localhost:3000/login",{
            password: this.password,
            email: this.email
        }).then(res => {
            console.log(res);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('usuario',res.data.usuario);
            this.$router.push({name: 'dashboard'});
        }).catch(err => {
            var msgErro = err.response.data.err;
            this.error = msgErro;
        })
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      logout(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        this.logado = undefined;
        this.$router.push({name: 'login'});
      }
    }
  };
</script>
<style>
</style>
