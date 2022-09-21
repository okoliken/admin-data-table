export const state = () => ({
  all_users: [],
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
//   josh: (arr) => {
//     initValue = 0;
//     for (var i = 0; i < arr.length; i++) {
//       initValue += arr[i];
//     }

//     return initValue;
//   },
};

export const mutations = {};

export const actions = {
  async get_all_users({ state }, id) {
    const data = await this.$axios.$get(`/users/${id}`);
    state.all_users = data.data;
    return data;
  },
};

export const strict = false;
