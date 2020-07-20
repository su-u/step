// import { globalObject } from '@/./global';
//
// const assignment = (from, to) => {
//   globalObject[to.name] = from;
//   return from;
// };
//
// export const interprit = (ast) => {
//   let last = null;
//   switch (ast['type']) {
//     case 'Program':
//       for (let line of ast['body']) {
//         interprit(line);
//       }
//       break;
//     case 'ExpressionStatement':
//       break;
//     case 'AssignmentExpression':
//       let from = interprit(right);
//       let to = interprit(left);
//       last = assignment(from, to);
//       return last;
//       break;
//     case 'LambdaExpresson':
//       break;
//     case 'BlockStatement':
//       break;
//     case 'CallExp@ression':
//       break;
//     case 'PipelineExpression':
//       break;
//     case 'MemberExpression':
//       break;
//     case 'NumericalLiteral':
//       break;
//     case 'identifier':
//       return ast;
//       break;
//   }
// };
