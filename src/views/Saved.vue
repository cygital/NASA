<template>
  <Navigation></Navigation>
  <div class="content-column">
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div class="title">Saved/Favourite Asteriods</div>
    <table class="table" width="100%">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        <tr v-for="row in result" v-bind:key="row">
          <td> {{ row.neo_id }}</td>
          <td> {{ row.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import { db } from '../firebase';
export default {
  name: 'Saved',
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
    db.collection('neo').where('user_id', '==',this.$store.state.user.id).get().then((docs) => {
      this.result = [];
      docs.forEach(doc => {
        this.result.push({
            key: doc.id,
            name: doc.data().name,
            neo_id: doc.data().neo_id
        })
      })
      this.loading = false
    }).catch((error) => {
      alert(error.message)
      this.loading = false
    })

  }
}
</script>