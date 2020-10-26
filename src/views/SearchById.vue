<template>
  <div>
    <Navigation></Navigation>
    <div class="content-column">
      <div v-if="loading" class="loading-indicator">Loading...</div>
      <div class="title">List of 10 Asteriods</div>
      <div>
        <input type="text" name="neoId" placeholder="Enter ID" v-model="neoId" required />&nbsp;
        <button @click="search">Search</button>
      </div>
      <div v-if="item">
        <table class="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Max. Diameter(m)</th>
              <th>Observation Date</th>
              <th>Class Description</th>
            </tr>
            <tr>
              <td> {{ item.name }}</td>
              <td> {{ item.estimated_diameter.meters.estimated_diameter_max }}</td>
              <td> {{ item.orbital_data.last_observation_date}}</td>
              <td> {{ item.orbital_data.orbit_class.orbit_class_description}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import { nasaApiKey } from '../config';
import axios from 'axios'
export default {
  name: 'SearchById',
  components: {
    Navigation
  },
  data () {
    return {
      neoId: "3729835",
      item: null,
      loading: false
    }
  },
  methods: {
    search() {
      this.loading = true
      axios
      .get('https://api.nasa.gov/neo/rest/v1/neo/'+this.neoId, {
        params: {
          api_key: nasaApiKey
        }
      })
      .then(response => {
        this.item = response.data
      })
      .catch(error => {
        alert(error.message+". Record may not exist!")
      })
      .finally(() => this.loading = false)
    }

  }
}
</script>
