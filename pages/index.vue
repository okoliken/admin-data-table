<template>
  <v-row>
    <v-col cols="12" sm="8" md="12">
      <v-card class="my-5 pa-3">
        <v-layout justify-space-between>
          <v-flex md5 class="d-flex">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  height="40px"
                  outlined
                  class="py-2"
                  color="#C6C2DE"
                >
                  <v-icon large left color="#8B83BA">mdi-filter</v-icon>
                  <span class="filter font-weight-bold">Sort</span>
                </v-btn>
              </template>
              <v-list width="220px" dense>
                <v-list-item>
                  <div class="expand-list--item">
                    <h4>Sort by:</h4>

                    <div
                      class="d-flex flex-column"
                      style="width: 100% !important"
                    >
                      <div>
                        <v-radio-group v-model="radioGroup">
                          <v-radio
                            dense
                            @click="$store.commit('sortDefault')"
                            label="Default"
                            value="Default"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortFirstName')"
                            label="First name"
                            value="First name"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortLastName')"
                            label="Last name"
                            value="Last name"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortDueDate')"
                            label="Due date"
                            value="Due date"
                          ></v-radio>
                          <v-radio
                            dense
                            @click="$store.commit('sortLogin')"
                            label="Last login"
                            value="Last login"
                          ></v-radio>
                        </v-radio-group>
                      </div>
                      <!-- <v-divider></v-divider>

                      <v-radio-group v-model="radioGroup2">
                        <v-radio dense label="All" value="All"></v-radio>
                        <v-radio dense label="Active" value="Active"></v-radio>
                        <v-radio
                          dense
                          label="Inactive"
                          value="Inactive"
                        ></v-radio> -->
                      </v-radio-group>
                    </div>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-flex>
              <v-text-field
                solo
                dense
                flat
                color="#8B83BA"
                background-color="#F4F2FF"
                height="40px"
                class="ml-4"
                v-model="search"
                max-width="392px"
                placeholder="Search Users by Name, Email or Date"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </v-flex>
          </v-flex>

          <v-btn
            depressed
            @click="change_payment_status"
            :loading="updating"
            height="40px"
            class="white--text"
            color="#6D5BD0"
          >
            PAY DUES
          </v-btn>
        </v-layout>

        <div>
          <div></div>
          <v-data-table
            v-model="selected"
            show-select
            :single-select="true"
            :headers="headers"
            color="#F4F2FF"
            :items="all_users"
            :loading="loading"
            :items-per-page="100"
            :search="search"
            show-expand
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            @input="get_payment_id"
          >
            <template v-slot:item.firstName="{ item }">
              <v-layout column>
                <span class="font-weight-bold"
                  >{{ item.firstName }} {{ item.lastName }}</span
                >
                <span class="email">{{ item.email }}</span>
              </v-layout>
            </template>
            <template v-slot:item.userStatus="{ item }">
              <v-layout align-start column>
                <v-chip
                  small
                  :class="
                    item.userStatus == 'inactive'
                      ? 'bg-light-grey'
                      : 'bg-light-purple'
                  "
                  class="font-weight-bold text-capitalize bg-light-purple mb-1"
                  :text-color="
                    item.userStatus == 'inactive' ? '#6E6893' : '#4A4AFF'
                  "
                >
                  <img
                    :src="
                      item.userStatus == 'inactive'
                        ? require('../static/inactive.svg')
                        : require('../static/Ellipse 2.svg')
                    "
                    class="mr-1"
                    alt=""
                  />
                  {{ item.userStatus }}</v-chip
                >
                <span class="email">Last login: {{ item.lastLogin }}</span>
              </v-layout>
            </template>
            <template v-slot:item.paymentStatus="{ item }">
              <v-layout align-start column>
                <v-chip
                  small
                  :class="paymentClass(item.paymentStatus)"
                  class="font-weight-bold text-capitalize bg-light-purple mb-1"
                  :text-color="paymentColor(item.paymentStatus)"
                >
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    class="mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="3"
                      cy="3"
                      r="3"
                      :fill="paymentColor(item.paymentStatus)"
                    />
                  </svg>
                  {{ item.paymentStatus }}</v-chip
                >
                <span class="paid"
                  >Paid on: {{ formatNullValues(item.paidOn) }}</span
                >
              </v-layout>
            </template>

            <template v-slot:item.amountInCents="{ item }">
              <span class="font-weight-bold">${{ item.amountInCents }}</span>
              <span class="d-block">USD</span>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-menu offset-y :close-on-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon> mdi-dots-vertical </v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-item
                    @click="
                      changeAccountStatus({ type: 'activate', id: item.id })
                    "
                    link
                    color="#F4F2FF"
                    class="green--text"
                  >
                    Activate User
                  </v-list-item>
                  <v-list-item
                    @click="
                      changeAccountStatus({ type: 'deactivate', id: item.id })
                    "
                    link
                    color="#F4F2FF"
                  >
                    Deactivate User
                  </v-list-item>
                  <v-list-item
                    @click="
                      changeAccountStatus({ type: 'delete', id: item.id })
                    "
                    link
                    color="#F4F2FF"
                    class="red--text"
                  >
                    Delete User
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <th :colspan="headers.length">
                {{ item.activities }}
              </th>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "@nuxtjs/axios";
export default {
  name: "IndexPage",
  data() {
    return {
      selected: [],
      singleExpand: true,
      expanded: [],
      headers: [
        {
          text: "NAME",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "USER STATUS", value: "userStatus", sortable: false },
        { text: "PAYMENT STATUS", value: "paymentStatus", sortable: false },
        { text: "AMOUNT", value: "amountInCents", sortable: false },
        { text: "", value: "actions", sortable: false },
      ],
      loading: false,
      search: "",
      radioGroup: 1,
      radioGroup2: 1,
      id: "",
      updating: false,
      url: "",
    };
  },
  computed: {
    // RETURN COMPUTED VALUE OF ALL USERS, ALSO FILTERS USERS BASED ON PAYMENT TYPE
    all_users() {
      if (!this.filter_type) return this.$store.state.all_users;
      return this.$store.state.all_users.filter((payments) => {
        return payments.paymentStatus == this.filter_type;
      });
    },
    // END
    // RETURNS PAYMENT TYPE
    filter_type() {
      return this.$store.state.filterType;
    },
    // END
  },
  methods: {
    get_payment_id(value) {
      // GET USER ID
      value.forEach((val) => {
        this.id = val.id;
      });
      // END

      // CHECK FOR PAYMENT STATUS FOR PAID AND UNPAID THEN ASSIGN THE RESPECTIVE ENDPOINT URL
      this.selected.forEach((val) => {
        if (val.paymentStatus === "paid") {
          this.url = `/mark-unpaid/${this.id}`;
        } else if (val.paymentStatus === "unpaid") {
          this.url = `/mark-paid/${this.id}`;
        } else this.url = `/mark-paid/${this.id}`;
      });
      // END
    },
    // CHANGE PAYMENT STATUS
    async change_payment_status() {
      if (this.selected.length) {
        this.updating = true;
        await this.$axios
          .patch(this.url)
          .then(() => {
            this.getAllPayments();
            this.updating = false;
          })
          .catch((err) => {
            return err;
          });
        this.updating = false;
      } else return;
    },
    // END
    async changeAccountStatus(value) {
      this.loading = true;
      await this.$store
        .dispatch("status_changer", value)
        .then(() => {
          this.getAllPayments();
        })
        .catch((err) => {
          return err;
        });
    },
    paymentColor(col) {
      if (col == "paid") {
        return "#007F00";
      } else if (col == "unpaid") {
        return "#965E00";
      } else return "#D30000";
    },
    paymentClass(col) {
      if (col == "paid") {
        return "bg-light-green";
      } else if (col == "unpaid") {
        return "bg-light-yellow";
      } else return "bg-light-red";
    },
    formatNullValues(value) {
      return value == null ? "No data" : value;
    },
    async getAllPayments() {
      this.loading = true;
      await this.$store.dispatch("get_all_users").then(() => {
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getAllPayments();
  },
};
</script>

<style scoped>
.filter {
  color: #25213b !important;
}
.email {
  font-size: 14px;
  color: #6e6893;
  font-weight: 400;
}
.paid {
  color: #25213b;
  font-weight: 500;
  font-size: 12px;
}
.bg-light-purple {
  background-color: #e6e6f2 !important;
  height: 19px;
}
.bg-light-grey {
  background-color: #f2f0f9 !important;
  height: 19px;
}
.bg-light-green {
  background-color: #cdffcd !important;
  height: 19px;
}
.bg-light-red {
  background-color: #ffe0e0 !important;
  height: 19px;
}
.bg-light-yellow {
  background-color: #ffeccc !important;
  height: 19px;
}
.expand-list--item {
  max-width: 200px !important;
  width: 100% !important;
}
</style>
<!-- /mark-paid/{id} -->
