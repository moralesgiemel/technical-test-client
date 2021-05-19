 <template>
  <v-dialog v-model="editPrincipleDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="warning" dark v-bind="attrs" v-on="on" rounded>Edit</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Principle</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="label"
                  :rules="addLabelRules"
                  label="Principle Label"
                  solo
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="text"
                  :rules="addTextRules"
                  solo
                  label="Principle Text"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="validate"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 
 <script>
export default {
  props: {
    idProp: {
      type: String,
    },
    labelProp: {
      type: String,
    },
    textProp: {
      type: String,
    },
  },
  data() {
    return {
      id: "",
      label: "",
      text: "",
      valid: false,
      addPrincipleDialog: false,
      addLabelRules: [(v) => !!v || "* Label is required"],
      addTextRules: [(v) => !!v || "* Text is required"],
      editPrincipleDialog: false,
    };
  },
  methods: {
    editPrinciple() {
      let payload = {
        _id: this.id,
        label: this.label,
        text: this.text,
      };
      console.log(payload);
      this.$http
        .put(`${process.env.VUE_APP_API}/principles/edit`, { ...payload })
        .then((response) => {
          response.data
            ? this.$swal.fire(this.$results.result.principleEditSuccess)
            : this.$swal.fire(this.$results.result.error);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          this.$emit("getPrinciples");
        });

      this.closeDialog();
    },
    initializeProps() {
      this.id = this.idProp;
      this.label = this.labelProp;
      this.text = this.textProp;
    },
    validate() {
      this.$refs.form.validate();

      if (this.label === "" || this.text === "") {
        this.valid = false;
      }

      if (this.valid) {
        this.editPrinciple();
      }
    },
    closeDialog() {
      this.editPrincipleDialog = false;
      this.label = this.labelProp;
      this.text = this.textProp;
    },
  },
  mounted() {
    this.initializeProps();
  },
};
</script>
 
 <style>
</style>
 