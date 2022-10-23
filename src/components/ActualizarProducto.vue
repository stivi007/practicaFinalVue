<template>
  <div v-if="dato" class="edit-form">
    <h4>Actualizar Producto</h4>
    <form>
      <div class="form-group">
        <label for="title">Producto</label>
        <input type="text" class="form-control" id="title"
          v-model="dato.producto"
        />
      </div>
      <div class="form-group">
        <label for="precio">Precio</label>
        <input
          type="number"
          class="form-control"
          id="precio"
          required
          v-model="dato.precio"
          name="precio"
        />
      </div>
      <div class="form-group">
        <label for="categoria">Categoria</label>
        <select class="form-control" name="" id="" v-model="dato.categoriaId">
          <option v-for="item in categorias" :key="item.id" :value="item.id">
            {{ item.categoria }}
          </option>
        </select>
      </div>

      <!-- <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ dato.published ? "Published" : "Pending" }}
      </div> -->
    </form>
  <br>
    <button class="mr-2 btn btn-primary"
      @click="actualizarProducto(true)"
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
import ProductoDataService from "../services/ProductoDataService";
import CategoriaDataService from "../services/CategoriaDataService";

export default {
  name: "actualizar-producto",
  data() {
    return {
      dato: null,
      categorias: null,
      message: ''
    };
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
    this.getCategorias();
  },
  methods: {
    getTutorial(id) {
      ProductoDataService.getProducto(id)
        .then(response => {
          this.dato = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCategorias() {
      CategoriaDataService.getCategorias()
        .then(response => {
          this.categorias = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    actualizarProducto(status) {
      var data = {
        id: this.dato.id,
        producto: this.dato.producto,
        precio: this.dato.precio,
        categoriaId: this.dato.categoriaId,
      };

      ProductoDataService.actualizarProducto(this.dato.id, data)
        .then(response => {
          this.dato.published = status;
          console.log(response.data);
          this.$router.push({ name: "productos"});
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      ProductoDataService.delete(this.dato.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
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
