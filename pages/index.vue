<template>
  <v-layout
    column
    justify-center
  >
    <v-flex
      xs12
      full-width
      class="mx-5"
    >
      <div class="text-center row align-center">
        <v-text-field
          v-model="url"
          placeholder="Input URL and start parsing..."
          prepend-icon="mdi-map-marker"
          class="pr-4"
          :rules="[ ...urlValidRules, ...requiredRules ]"
        />
        <v-btn
          small
          dark
          color="primary"
          @click="startParsing"
        >
          Start
        </v-btn>
      </div>
    </v-flex>

    <v-flex row>
      <v-card class="ma-0 pa-0">
        <v-card-text v-if="content && url">
          <div v-html="content" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      url: '',
      requiredRules: [
        val => !!val || 'Field is required'
      ],
      urlValidRules: [
        v => !v || /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(v) || 'URL must be valid.'
      ]
    }
  },

  computed: {
    content () {
      return this.$store.state.content
    }
  },

  methods: {
    ...mapActions(['parseURL']),

    async startParsing () {
      await this.parseURL({ url: this.url })
    }
  }
}
</script>
