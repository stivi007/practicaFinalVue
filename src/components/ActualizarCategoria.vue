<template>
  <div v-if="dato" class="edit-form">
    <h4>Formulario de Categoria</h4>
    <form>
      <div class="form-group">
        <label for="title">Categoria</label>
        <input type="text" class="form-control" id="title"
          v-model="dato.categoria"
        />
      </div>

      <!-- <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ dato.published ? "Published" : "Pending" }}
      </div> -->
    </form>

    <button class="mr-2"
      @click="actualizarCategoria(true)"
    >
      Actualizar
    </button>


    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
  </div>
</template>

<script>
import CategoriaDataService from "../services/CategoriaDataService";

export default {
  name: "actualizar-categoria",
  data() {
    return {
      dato: null,
      message: ''
    };
  },
  mounted() {
    this.message = '';
    this.getCategoria(this.$route.params.id);
  },
  methods: {
    getCategoria(id) {
      CategoriaDataService.getCategoria(id)
        .then(response => {
          this.dato = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    actualizarCategoria(status) {
      var data = {
        id: this.dato.id,
        categoria: this.dato.categoria,
      };

      CategoriaDataService.actualizarCategoria(this.dato.id, data)
        .then(response => {
          this.dato.published = status;
          console.log(response.data);
          this.$router.push({ name: "categorias"});
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
