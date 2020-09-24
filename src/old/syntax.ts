import { globalObject } from '@/old/global';
import { ObjectEnum } from '@/old/objectEnum';
import { binaryExec } from '@/old/exec';

export const syntax = (ast: AstType): void => {
  switch (ast.type) {
    case 'Program':
      for (const line of ast.body) {
        switch (line.type) {
          case 'ExpressionStatement':
            const exp = line.expression.type;
            switch (exp) {
              case 'AssignmentExpression':
                const source = line.expression.right;
                const left = line.expression.left as IdentifierType;
                switch (source.type) {
                  case 'Literal':
                    console.log(`L: ${left.name}`);
                    globalObject[left.name] = {
                      type: ObjectEnum.VARIABLE,
                      value: source.value,
                      class: source.class,
                    };
                    break;
                  case 'BinaryExpression':
                    globalObject[left.name] = binaryExec(
                      source.left,
                      source.operator,
                      source.right,
                    ) as BinaryExpressionType;
                    break;
                }
                //global[]
                break;
            }
        }
      }
      break;
  }

  console.log(globalObject);
};
