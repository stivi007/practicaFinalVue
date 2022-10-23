<template>
  <div class="submit-form">
    <div><router-link to="/productos" class="btn btn-link">Volver Atrás</router-link></div>
    <div v-if="!submitted">

    <fieldset>
    <legend>Crear Producto</legend>
      <div class="form-group">
        <label for="producto">Producto</label>
        <input
          type="text"
          class="form-control"
          id="producto"
          required
          v-model="dato.producto"
          name="producto"
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
      <br>
      </fieldset>

      <button @click="guardarProducto" class="btn btn-success">Guardar</button>
    </div>

    <div v-else>
      <h4>Se ha creado un nuevo registro!</h4>
      <button class="btn btn-success" @click="newTutorial">Crear nuevo</button>
    </div>
  </div>
</template>

<script>
import ProductoDataService from "../services/ProductoDataService";
import CategoriaDataService from "../services/CategoriaDataService";

export default {
  name: "nuevo-producto",
  data() {
    return {
      dato: {
        id: null,
        producto: "",
        precio: "",
        categoriaId: "",
      },
      categorias: null,
      submitted: false
    };
  },
  mounted() {
    this.getCategorias();
  },
  methods: {
    guardarProducto() {
      var data = {
        producto: this.dato.producto,
        precio: this.dato.precio,
        categoriaId: this.dato.categoriaId,
      };

      ProductoDataService.guardarProducto(data)
        .then(response => {
          this.dato.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
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
    
    newTutorial() {
      this.submitted = false;
      this.dato = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
