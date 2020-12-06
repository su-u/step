import { entry } from './index';

// export const webEntry = (source: string) => {
//   entry(source);
// }

const webEntry =  () => {
  console.log('test');
}
module.exports = webEntry;
exports.webEntry = webEntry;
module.exports.default = webEntry;


