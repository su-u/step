export type ConsoleObjectMethodType = {
  default: (obj: any, params: any, options: any) => any;
};

export const ConsoleClass: ConsoleObjectMethodType = {
  default: (obj, params, options) => {
    console.log(obj.image);
    return obj;
  },
};
