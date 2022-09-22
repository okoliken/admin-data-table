<template>
  <v-app>
    <v-main>
      <v-container class="mt-12">
        <div class="data-table__header">
          <h3>Table Heading</h3>
        </div>
        <v-layout justify-space-between class="tab__liner">
          <v-tabs>
            <v-tab @click="$store.commit('mutateFilterType', '')">All</v-tab>
            <v-tab @click="$store.commit('mutateFilterType', 'paid')"
              >Paid</v-tab
            >
            <v-tab @click="$store.commit('mutateFilterType', 'unpaid')"
              >Unpaid</v-tab
            >
            <v-tab @click="$store.commit('mutateFilterType', 'overdue')"
              >Overdue</v-tab
            >
          </v-tabs>
          <p class="mb-0 amount_pay">
            Total payable amount:
            <span style="color: #6d5bd0" class="font-weight-bold">{{
              totalAmount | formatPrice
            }}</span>
            USD
          </p>
        </v-layout>
        <nuxt />
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
  computed: {
    totalAmount() {
      return this.$store.getters.calculate_amount_payable;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
.v-application {
  background-color: #f2f0f9 !important;
  font-family: "Inter";
}
.v-tabs .theme--light {
  background-color: #f2f0f9 !important;
}
.v-tab {
  text-transform: capitalize !important;
  font-weight: bold;
  font-size: 14px !important;
  color: #6e6893 !important;
  padding: 0;
}

.data-table__header {
  font-family: "Inter";
  margin-bottom: 14px;
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6e6893;
}
.v-tab--active,
.v-tabs-slider {
  color: #25213b !important;
  padding: 0;
  margin: 0;
}
.v-tabs-slider {
  width: 90% !important;
  display: flex;
  align-items: center;
  justify-items: center;
}
.tab__liner {
  border-bottom: 2px solid #c6c2de !important;
  transform: translateY(-1px);
}
.amount_pay {
  font-size: 14px;
  color: #6e6893;
  font-weight: 500;
}
.v-icon {
  color: #8b83ba !important;
}
.v-input__slot fieldset {
  border-radius: 50px !important;
}
input::placeholder {
  color: #6e6893 !important;
  font-size: 13px !important;
}
.v-data-table table thead {
  background-color: #f4f2ff !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 2px solid #c6c2de !important;
}

.v-data-table table thead tr th {
  border-bottom: none !important;
}

tbody tr td {
  color: #25213b;
  height: 58px !important;
}

.v-data-table table thead tr th span {
  font-weight: bolder !important;
  font-size: 14px !important;

  color: #6e6893 !important;
}
tr:hover {
  background-color: #fbf9ff !important;
  cursor: pointer;
}
.v-radio {
  flex-direction: row-reverse !important;
  justify-content: space-between;
  max-width: 300px !important;
  width: 100% !important;
}
.v-list-item {
  width: 100% !important;
  max-width: 100%;
}
</style>
