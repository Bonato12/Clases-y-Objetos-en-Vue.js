<template>
  <div id="app">
      <div style="float:left;">
        <form v-if="this.show" @submit.prevent="postPeliculas()">
          <div>
            <h2>Cargar Pelicula</h2>
          </div>
          <div>
            <p>Titulo</p>
            <input required type="text" v-model="pelicula.titulo">
          </div>
          <br>
          <div>
            <p>Año</p>
            <input required type="text" v-model="pelicula.año">
          </div>
          <br>
            <button type="submit">Guardar</button>
        </form>
      </div>
      <div>
      </div>
      <div style="width:400px; float:right;">
          <div>
            <li v-for="item in peliculas">
              <p> {{ item.titulo }}</p>
              <button v-on:click="eliminarPelicula(item)">X</button>
            </li>
          </div>
          <!--
          <div>
            <li v-for="item in this.lista">
              <p> {{ item.pelicula.titulo }}</p>
              <button v-on:click="eliminarLista(item)">X</button>
            </li>
          </div>
          -->
      </div>
      <!--
      <button v-on:click="getPeliculas()">Peliculas</button>
      -->
  </div>
</template>
<script>


import axios from 'axios'

//Definimos una Clase Pelicula con dos Atributos
class Pelicula {
  constructor(titulo,año){
    this.titulo = titulo;
    this.año = año;
  }
}

export default {
  name: 'app',
  data () {
    //Funcion Exclusiva de Vue en donde se define los datos del Modelo
    return {
       //Creamos un Objeto jugador de tipo Jugador
       pelicula : new Pelicula(),
       show: true,
       peliculas: [],
       lista: []
    }
  },
  created(){
    //Funcion Exclusiva de Vue para cuando se carga la Pagina
    this.getPeliculas();


  },
  mounted(){

  },
  computed:{

  },
  methods:{
    //Funcion Exclusiva de Vue para crear los Metodos o Funciones
    //Funcion de Axios para traer Informacion desde el Servidor
    getPeliculas(){
      axios.get('http://localhost:3000/peliculas').then((response)=>{
          this.peliculas = response.data;
      }).then(alert("Carga Correcta"));
    },
    //Funcion de Axios para enviar informacion al Servidor
    postPeliculas(){
      console.log(this.pelicula);
      if (this.pelicula.titulo && this.pelicula.año){
        axios.post('http://localhost:3000/peliculas',
        this.pelicula,
        { headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/peliculas',
                    'Content-Type': 'application/json',
                   },
        }
        //URL,
        //DATOS,
        //HEADERS,
      ).then(data=>{
        this.getPeliculas();
      })
      }
    },
    eliminarPelicula(id){
      //URL + ID
      axios.delete('https://api.themoviedb.org/peliculas/accion/'+ id).then(response=>{
          getPeliculas();
      }
      )

    },
    guardarLista(){
      var objeto = {
        posicion: 1,
        pelicula: this.pelicula
      }
      this.lista.push(objeto);
      this.pelicula = new Pelicula();
      console.log(this.lista);
    },
    eliminarLista(parametro){
      console.log(parametro);
      var index = this.lista.indexOf(parametro);
      if (index > -1) {
          this.lista.splice(index, 1);
      }
    }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
