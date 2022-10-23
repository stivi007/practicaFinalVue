<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Escriba aqui..."
          v-model="input_search"/>
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button"
            @click="searchFunction"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div><router-link to="/nueva-categoria" class="btn btn-primary  text-white nav-link">Crear nuevo</router-link></div>
      <h4>Listado de Categorias</h4>
      <table class="table table-striped  ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in categorias" :key="item.id"
          @click="mostrarCategoria(item, item.id)">
            <td>{{ item.id }}</td>
            <td>{{ item.categoria }}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="col-md-6">
      <div v-if="categoriaSeleccionada">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Categoria:</strong></label> {{ categoriaSeleccionada.categoria }}
        </div>

        <router-link :to="'/categorias/' + categoriaSeleccionada.id" class="">Actualizar</router-link>
        <br>
        <a class="mr-2" @click="eliminar(categoriaSeleccionada.id)">
          Eliminar
        </a>
      </div>
      <div v-else>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import CategoriaDataService from "../services/CategoriaDataService";
// import { ref } from 'vue';
// import useModels from '../composables/useModels';
// const id = ref(1)
// const {getCategorias} = useModels
export default {
  name: "lista-categorias",
  data() {
    return {
      categorias: [],
      tutorials: [],
      categoriaSeleccionada: null,
      currentIndex: -1,
      input_search: ""
    };
  },
  methods: {
    getCategorias() {
      CategoriaDataService.getCategorias()
        .then(response => {
          this.categorias = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.getCategorias();
      this.categoriaSeleccionada = null;
      this.currentIndex = -1;
    },
    mostrarCategoria(item, index) {
      this.categoriaSeleccionada = item;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      CategoriaDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchFunction() {
      CategoriaDataService.findCategoria(this.input_search)
        .then(response => {
          this.categorias = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    eliminar(id) {
      CategoriaDataService.eliminarCategoria(id)
        .then(response => {
          console.log(response.data);
          this.getCategorias();
          this.categoriaSeleccionada = null;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getCategorias();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
