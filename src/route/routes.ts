import {
  ABOUT,
  ACCOUNT,
  CONTACTS,
  HOME,
  DASHBOARD,
  PROVIDER_TRADING,
  SIGN_IN,
  SIGN_UP,
  REQUEST_PASSWORD_RESET,
  PASSWORD_RESET,
} from "../utils/pages";
export const routes = {
  home: {
    base: {
      get() {
        return formatPathName(HOME);
      },
      use() {
        return formatPathName(HOME);
      },
    },
  },
  signIn: {
    base: {
      get() {
        return `${formatPathName(SIGN_IN)}`;
      },
      use() {
        return `${formatPathName(SIGN_IN)}`;
      },
    },
  },
  signUp: {
    base: {
      get() {
        return `${formatPathName(SIGN_UP)}`;
      },
      use() {
        return `${formatPathName(SIGN_UP)}`;
      },
    },
  },
  requestPasswordReset: {
    base: {
      get() {
        return `${formatPathName(REQUEST_PASSWORD_RESET)}`;
      },
      use() {
        return `${formatPathName(REQUEST_PASSWORD_RESET)}`;
      },
    },
  },
  passwordReset: {
    base: {
      get() {
        return `${formatPathName(PASSWORD_RESET)}`;
      },
      use() {
        return `${formatPathName(PASSWORD_RESET)}`;
      },
    },
  },
  providerTrading: {
    base: {
      get() {
        return `${formatPathName(PROVIDER_TRADING)}/:id`;
      },
      use(id: string) {
        return `${formatPathName(PROVIDER_TRADING)}/${id}`;
      },
    },
    services: {
      get() {
        return `${routes.providerTrading.base.get()}/services`;
      },
      use(id: string) {
        return `${routes.providerTrading.base.use(id)}/services`;
      },
    },
    details: {
      get() {
        return `${routes.providerTrading.base.get()}/details`;
      },
      use(id: string) {
        return `${routes.providerTrading.base.use(id)}/details`;
      },
    },
    gallery: {
      get() {
        return `${routes.providerTrading.base.get()}/gallery`;
      },
      use(id: string) {
        return `${routes.providerTrading.base.use(id)}/gallery`;
      },
    },
    reviews: {
      get() {
        return `${routes.providerTrading.base.get()}/reviews`;
      },
      use(id: string) {
        return `${routes.providerTrading.base.use(id)}/reviews`;
      },
    },
  },
  providerDashboard: {
    base: {
      get() {
        return formatPathName(DASHBOARD);
      },
      use() {
        return formatPathName(DASHBOARD);
      },
    },
    services: {
      get() {
        return `${routes.providerDashboard.base.get()}/services`;
      },
      use() {
        return `${routes.providerDashboard.base.get()}/services`;
      },

      createService: {
        get() {
          return `${routes.providerDashboard.services.get()}/create`;
        },
        use() {
          return `${routes.providerDashboard.services.get()}/create`;
        },
      },
      viewService: {
        get() {
          return `${routes.providerDashboard.services.get()}/:id/view`;
        },
        use(id: string) {
          return `${routes.providerDashboard.services.get()}/${id}/view`;
        },
      },
      updateService: {
        get() {
          return `${routes.providerDashboard.services.get()}/:id/update`;
        },
        use(id: string) {
          return `${routes.providerDashboard.services.get()}/${id}/update`;
        },
      },
      deleteService: {
        get() {
          return `${routes.providerDashboard.services.get()}/:id/delete`;
        },
        use(id: string) {
          return `${routes.providerDashboard.services.get()}/${id}/delete`;
        },
      },
    },

    details: {
      get() {
        return `${routes.providerDashboard.base.get()}/details`;
      },
      use() {
        return `${routes.providerDashboard.base.get()}/details`;
      },
    },

    tradingTimes: {
      get() {
        return `${routes.providerDashboard.base.get()}/trading-times`;
      },
      use() {
        return `${routes.providerDashboard.base.get()}/trading-times`;
      },
      createTradingTime: {
        get() {
          return `${routes.providerDashboard.tradingTimes.get()}/create`;
        },
        use() {
          return `${routes.providerDashboard.tradingTimes.get()}/create`;
        },
      },
      viewTradingTime: {
        get() {
          return `${routes.providerDashboard.tradingTimes.get()}/:id/view`;
        },
        use(id: string) {
          return `${routes.providerDashboard.tradingTimes.get()}/${id}/view`;
        },
      },
      updateTradingTime: {
        get() {
          return `${routes.providerDashboard.tradingTimes.get()}/:id/update`;
        },
        use(id: string) {
          return `${routes.providerDashboard.tradingTimes.get()}/${id}/update`;
        },
      },
      deleteTradingTime: {
        get() {
          return `${routes.providerDashboard.tradingTimes.get()}/:id/delete`;
        },
        use(id: string) {
          return `${routes.providerDashboard.tradingTimes.get()}/${id}/delete`;
        },
      },
    },

    staffs: {
      get() {
        return `${routes.providerDashboard.base.get()}/staffs`;
      },
      use() {
        return `${routes.providerDashboard.base.get()}/staffs`;
      },

      createStaff: {
        get() {
          return `${routes.providerDashboard.staffs.get()}/create`;
        },
        use() {
          return `${routes.providerDashboard.staffs.get()}/create`;
        },
      },
      viewStaff: {
        get() {
          return `${routes.providerDashboard.staffs.get()}/:id/view`;
        },
        use(id: string) {
          return `${routes.providerDashboard.staffs.get()}/${id}/view`;
        },
      },
      updateStaff: {
        get() {
          return `${routes.providerDashboard.staffs.get()}/:id/update`;
        },
        use(id: string) {
          return `${routes.providerDashboard.staffs.get()}/${id}/update`;
        },
      },
      deleteStaff: {
        get() {
          return `${routes.providerDashboard.staffs.get()}/:id/delete`;
        },
        use(id: string) {
          return `${routes.providerDashboard.staffs.get()}/${id}/delete`;
        },
      },
    },

    gallery: {
      get() {
        return `${routes.providerDashboard.base.get()}/gallery`;
      },
      use() {
        return `${routes.providerDashboard.base.get()}/gallery`;
      },
      createGallery: {
        get() {
          return `${routes.providerDashboard.gallery.get()}/create`;
        },
        use() {
          return `${routes.providerDashboard.gallery.get()}/create`;
        },
      },
      viewGallery: {
        get() {
          return `${routes.providerDashboard.gallery.get()}/:id/view`;
        },
        use(id: string) {
          return `${routes.providerDashboard.gallery.get()}/${id}/view`;
        },
      },
      updateGallery: {
        get() {
          return `${routes.providerDashboard.gallery.get()}/:id/update`;
        },
        use(id: string) {
          return `${routes.providerDashboard.gallery.get()}/${id}/update`;
        },
      },
      deleteGallery: {
        get() {
          return `${routes.providerDashboard.gallery.get()}/:id/delete`;
        },
        use(id: string) {
          return `${routes.providerDashboard.gallery.get()}/${id}/delete`;
        },
      },
    },
  },
  account: {
    base: {
      get() {
        return formatPathName(ACCOUNT);
      },
      use() {
        return formatPathName(ACCOUNT);
      },
    },
  },
  about: {
    base: {
      get() {
        return formatPathName(ABOUT);
      },
      use() {
        return formatPathName(ABOUT);
      },
    },
  },
  contacts: {
    base: {
      get() {
        return formatPathName(CONTACTS);
      },
      use() {
        return formatPathName(CONTACTS);
      },
    },
  },
};

export function formatPathName(name: string) {
  return name.replace(" ", "-").toLowerCase();
}
