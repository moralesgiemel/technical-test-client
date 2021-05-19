<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Values</h1>
        <AddValue @getValues="getValues" class="mb-5" />
        <div class="values-container mb-5 mt-5">
          <v-card class="card-value" v-for="value in values" :key="value._id">
            <v-card-title>{{ value.label }}</v-card-title>
            <v-card-text>{{ value.text }}</v-card-text>
            <v-card-actions>
              <EditValue
                :idProp="value._id"
                :labelProp="value.label"
                :textProp="value.text"
                @getValues="getValues"
              />
              <DeleteItem
                @getValues="getValues"
                :eventProp="'values'"
                :idProp="value._id"
                :labelProp="value.label"
              />
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Principles</h1>
        <AddPrinciple @getPrinciples="getPrinciples" />
        <div class="principles-container mt-5">
          <v-card
            class="card-principle"
            v-for="principle in principles"
            :key="principle._id"
          >
            <v-card-title>{{ principle.label }}</v-card-title>
            <v-card-text>{{ principle.text }}</v-card-text>
            <v-card-actions>
              <EditPrinciple
                :idProp="principle._id"
                :labelProp="principle.label"
                :textProp="principle.text"
                @getPrinciples="getPrinciples"
              />
              <DeleteItem
                @getPrinciples="getPrinciples"
                :eventProp="'principles'"
                :idProp="principle._id"
                :labelProp="principle.label"
              />
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddValue from "@/components/AddValue";
import EditValue from "@/components/EditValue";
import DeleteItem from "@/components/DeleteItem";
import AddPrinciple from "@/components/AddPrinciple";
import EditPrinciple from "@/components/EditPrinciple";

export default {
  name: "Home",

  components: { AddValue, EditValue, DeleteItem, AddPrinciple, EditPrinciple },
  data() {
    return {
      label: "",
      text: "",
      values: [],
      principles: [],
    };
  },
  methods: {
    getValues() {
      this.$http
        .get(`${process.env.VUE_APP_API}/values`)
        .then((response) => (this.values = response.data))
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
    getPrinciples() {
      this.$http
        .get(`${process.env.VUE_APP_API}/principles`)
        .then((response) => (this.principles = response.data))
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
  },
  mounted() {
    this.getValues();
    this.getPrinciples();
  },
};
</script>

<style scoped>
.card-value,
.card-principle {
  margin-bottom: 15px;
}
</style>
