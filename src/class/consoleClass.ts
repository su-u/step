export type ConsoleObjectMethodType = {
  default: (obj: any, params: any, options: any) => any;
};

export const ConsoleClass: ConsoleObjectMethodType = {
  default: (obj: any[], params, options) => {
    console.log(...obj.map((x) => x.image));
    return obj;
  },
};
