<template>
  <div id="app">
      <form v-if="this.show" @submit.prevent="postPeliculas()">
          <input type="text" v-model="pelicula.titulo">
          <input type="text" v-model="pelicula.año">
          <button type="submit">Guardar</button>
      </form>
      <div>
        <button v-on:click="getPeliculas()">Peliculas</button>
      </div>
      <div>
        <li v-for="item in peliculas">
          <p> {{ item.title }}</p>
          <button v-on:click="eliminarPelicula(item.id)">X</button>
        </li>
      </div>
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
       control: ''
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
    getPeliculas(){
      axios.get('https://api.themoviedb.org/3/discover/movie?api_key=1b62ccff88d2cd537027e1d82920197b&primary_release_date.gte=2018-05-15&primary_release_date.lte=2018-7-28').then((response)=>{
          console.log(response.data.results);
          this.peliculas = response.data.results;
      }).then(alert("Carga Correcta"));
    },
    postPeliculas(){
      if (this.pelicula.titulo && this.pelicula.año){
        axios.post('https://api.themoviedb.org/3/discover/movie?api_key=1b62ccff88d2cd537027e1d82920197b&primary_release_date.gte=2018-05-15&primary_release_date.lte=2018-7-28',
        this.pelicula,
        { headers: {
                  'Access-Control-Allow-Origin': 'http://localhost:3000/cliente',
                  'Content-Type': 'application/json',
                },
         }
        //URL,
        //DATOS,
        //HEADERS,
        )
      }
    },
    eliminarPelicula(id){
      //URL + ID
      axios.delete('https://api.themoviedb.org/peliculas/accion/'+ id).then(response=>{
          getPeliculas();
      }
      )

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
