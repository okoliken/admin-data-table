export const state = () => ({
  all_users: [],
  candidateId: "22XkZJQ5i87gvSY",
});

export const getters = {
  calculate_amount_payable: (state) => {
    let array_of_amounts = [];
    let initValue = 0;

    state.all_users.map((amount) => {
      return array_of_amounts.push(amount.amountInCents);
    });

    for (var i = 0; i < array_of_amounts.length; i++) {
      initValue += array_of_amounts[i];
    }

    return initValue;
  },
};

export const mutations = {
  allPaidPayments(state) {
    let values = [];
    state.all_users.map((payments) => {
      if (payments.paymentStatus === "paid") {
        values.push(payments);
      }
    });
     console.log(state.all_users = values);
  },
  allOverduePayments(state) {
    let values = [];
    state.all_users.filter((payments) => {
      if (payments.paymentStatus === "overdue") {
        values.push(payments);
      }
    });
    return (state.all_users = values);
  },
};

export const actions = {
  async get_all_users({ state }) {
    const data = await this.$axios.$get(`/users/${state.candidateId}`);
    state.all_users = data.data;
    return data;
  },
};

export const strict = false;
