<template>
  <v-row>
    <v-col cols="12" sm="8" md="12">
      <v-card class="my-5 pa-3">
        <v-layout justify-space-between>
          <v-flex md5 class="d-flex">
            <v-menu  offset-y :close-on-click="false">
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
                  <span class="filter">Filter</span>
                </v-btn>
              </template>
              <v-list width="300px" dense>
                <v-list-item>
                  <div class="expand-list--item">
                    <h4>Sort by:</h4>

                    <div>
                      <div >
                        <v-radio-group v-model="radioGroup">
                          <v-radio
                            dense
                            label="Default"
                            value="Default"
                          ></v-radio>
                          <v-radio
                            dense
                            label="First Name"
                            value="First Name"
                          ></v-radio>
                          <v-radio
                            dense
                            label="Last Name"
                            value="Last Name"
                          ></v-radio>
                          <v-radio
                            dense
                            label="Due Date"
                            value="Due Date"
                          ></v-radio>
                          <v-radio
                            dense
                            label="Last Login"
                            value="Last Login"
                          ></v-radio>
                        </v-radio-group>
                      </div>
                      <v-divider></v-divider>

                      <v-radio-group v-model="radioGroup2">
                        <v-radio dense label="All" value="All"></v-radio>
                        <v-radio dense label="Active" value="Active"></v-radio>
                        <v-radio
                          dense
                          label="Inactive"
                          value="Inactive"
                        ></v-radio>
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

          <v-btn depressed height="40px" class="white--text" color="#6D5BD0">
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
          >
            <template v-slot:item.firstName="{ item }">
              <v-layout column>
                <span class="font-weight-bold">{{ item.firstName }}</span>
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
                <span class="email">{{ item.email }}</span>
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
              <v-btn icon> <v-icon small> mdi-dots-vertical </v-icon></v-btn>
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
    };
  },
  computed:{
    all_users(){
      return this.$store.state.all_users
    }
  },
  methods: {
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
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("get_all_users").then(() => {
      this.loading = false;
    });

   
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
.expand-list--item{
  max-width: 300px !important;
}
</style>
