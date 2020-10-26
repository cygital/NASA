<template>
  <div>
    <Navigation></Navigation>
    <div class="content-column">
      <div v-if="loading" class="loading-indicator">Loading...</div>
      <div class="title">List of 10 Asteriods</div>

      <div>
        From: <input type="date" name="fromDate" v-model="searchFields.fromDate"  /> 
        To: <input type="date" name = "toDate" v-model="searchFields.toDate"  />&nbsp;
        <button @click="getFeed">Get Result</button>
      </div>
      <table class="table" width="100%">
        <tbody>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Max. Diameter(m)</th>
            <th>Observation Date</th>
            <th></th>
          </tr>
          <tr v-for="(row, index) in feed" v-bind:key="row">
            <td>{{ index+1 }}</td>
            <td>{{ row.name }}</td>
            <td> {{ row.estimated_diameter.meters.estimated_diameter_max }}</td>
            <td> {{ row.orbital_data.last_observation_date}}</td>
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
  name: 'SearchByRange',
  components: {
    Navigation
  },
  data () {
    return {
      searchFields: {
        fromDate: "2020-10-23",
        toDate: "2020-10-25"
      },
      feed: null,
      loading: false
    }
  },
  methods: {
    getFeed() {
      this.loading = true
      axios
      .get('https://api.nasa.gov/neo/rest/v1/feed', {
        params: {
          start_date: this.searchFields.fromDate,
          end_date: this.searchFields.toDate,
          detailed: "true",
          api_key: nasaApiKey
        }
      })
      .then(response => {
        let requiredData = []
        let _response = response.data.near_earth_objects[this.searchFields.toDate]
        if(Array.isArray(_response)){
          for(let item in _response){
            if(item < 10){
              requiredData[item] = _response[item]
            }
          }
        }
        this.feed = requiredData
      })
      .catch(error => {
        alert(error.message+". Note, date range cannot be more than 7 days")
      })
      .finally(() => this.loading = false)
    },
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
