export const interprit = (ast) => {
  switch (ast['type']) {
    case 'Program':
      for (let line of ast['body']) {
        interprit(line);
      }
      break;
    case 'ExpressionStatement':
      break;
    case 'AssignmentExpression':
      break;
    case 'LambdaExpresson':
      break;
    case 'BlockStatement':
      break;
    case 'CallExp@ression':
      break;
    case 'PipelineExpression':
      break;
    case 'MemberExpression':
      break;
    case 'NumericalLiteral':
      break;
    case 'identifier':
      break;
  }
};
