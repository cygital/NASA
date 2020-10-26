<template>
  <div>
    <Navigation></Navigation>
    <div class="content-column">
      <div v-if="loading" class="loading-indicator">Loading...</div>
      <div class="title">List of 10 Asteriods</div>
      <table class="table">
        <tbody>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Max. Diameter(m)</th>
            <th>Observation Date</th>
            <th>Class Description</th>
            <th></th>
          </tr>
          <tr v-for="(row, index) in result" v-bind:key="row">
            <td>{{ index+1 }}</td>
            <td> {{ row.name }}</td>
            <td> {{ row.estimated_diameter.meters.estimated_diameter_max }}</td>
            <td> {{ row.orbital_data.last_observation_date}}</td>
            <td> {{ row.orbital_data.orbit_class.orbit_class_description}}</td>
            <td><button  @click="saveNeo(row.name, row.id)">Save</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import { db } from '../firebase';
import { nasaApiKey } from '../config';
import axios from 'axios'
export default {
  name: 'Dashboard',
  components: {
    Navigation
  },
  data () {
    return {
      result: null,
      loading: true
    }
  },
  mounted () {
    axios
      .get('https://api.nasa.gov/neo/rest/v1/neo/browse', {
        params: {
          page: 0,
          size: 10,
          api_key: nasaApiKey
        }
      })
      .then(response => {
        this.result = response.data.near_earth_objects
      })
      .catch(error => {
        //console.log(error)
        alert(error.message)
      })
      .finally(() => this.loading = false)
  },
  methods:{
    saveNeo(name, id){
      db.collection('neo').add({
          neo_id:id,
          name:name,
          user_id:this.$store.state.user.id
        })
        .then(() => {
        alert("Saved successfully!")
      }).catch((error) => {
        alert(error.message)
      })
    }
  }
}
</script>