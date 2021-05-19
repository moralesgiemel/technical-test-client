<template>
  <v-dialog
    v-model="deleteValueDialog"
    persistent
    max-width="500"
    max-height="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" dark v-bind="attrs" v-on="on" rounded>
        Delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to delete {{ label }}?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteValue"> Yes </v-btn>
        <v-btn color="red darken-1" text @click="deleteValueDialog = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    eventProp: {
      type: String,
    },
    idProp: {
      type: String,
    },
    labelProp: {
      type: String,
    },
  },
  data() {
    return {
      label: "",
      event: "",
      deleteValueDialog: false,
    };
  },
  methods: {
    initializeProp() {
      this.id = this.idProp;
      this.label = this.labelProp;
      this.event = this.eventProp;
    },
    deleteValue() {
      let payload = {
        id: this.id,
      };

      let event = this.event;

      this.$http
        .delete(`${process.env.VUE_APP_API}/${event}/delete`, {
          data: { ...payload },
        })
        .then((response) => console.log(response))
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          if (event === "values") {
            this.$emit("getValues");
          } else {
            this.$emit("getPrinciples");
          }
        });

      this.closeDialog();
    },
    closeDialog() {
      this.deleteValueDialog = false;
    },
  },
  mounted() {
    this.initializeProp();
  },
};
</script>
