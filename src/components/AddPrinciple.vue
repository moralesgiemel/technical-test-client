 <template>
  <v-dialog v-model="addPrincipleDialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Add Principle</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Principle</span>
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
  data() {
    return {
      label: "",
      text: "",
      valid: false,
      addPrincipleDialog: false,
      addLabelRules: [(v) => !!v || "* Label is required"],
      addTextRules: [(v) => !!v || "* Text is required"],
    };
  },
  methods: {
    addPrinciple() {
      let payload = {
        label: this.label,
        text: this.text,
      };

      this.$http
        .post(`${process.env.VUE_APP_API}/principles/add`, { ...payload })
        .then((response) => {
          response.data
            ? this.$swal.fire(this.$results.result.addPrincipleSuccess) // new value added successfully
            : this.$swal.fire(this.$results.result.error); // error
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          this.$emit("getPrinciples");
        });

      this.label = "";
      this.text = "";

      this.closeDialog();
    },
    validate() {
      this.$refs.form.validate();

      if (this.label === "" || this.text === "") {
        this.valid = false;
      }

      if (this.valid) {
        this.addPrinciple();
      }
    },
    closeDialog() {
      this.addPrincipleDialog = false;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
};
</script>
 
 <style>
</style>
 