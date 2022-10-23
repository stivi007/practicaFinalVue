<template>

  <div class="submit-form">
    <div><router-link to="/categorias" class="btn btn-link">Volver Atrás</router-link></div>
    <div v-if="!submitted">

     <fieldset >
    <legend>Crear Categoria</legend>
      <div class="form-group">
        <label for="categoria">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="categoria"
          required
          v-model="tutorial.categoria"
          name="categoria"
        />
      </div>
      <br>
</fieldset>

      <button @click="guardarCategoria" class="btn btn-success">Guardar</button>
    </div>
    <div v-else>
      <h4>Se ha creado un nuevo registro!</h4>
      <button class="btn btn-success" @click="newTutorial">Crear nuevo</button>
    </div>
  </div>
</template>

<script>
import CategoriaDataService from "../services/CategoriaDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        categoria: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    guardarCategoria() {
      var data = {
        categoria: this.tutorial.categoria,
      };

      CategoriaDataService.guardarCategoria(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
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
