import { ObjectEnum } from '@/old/objectEnum';
import { globalObject } from '@/old/global';
import { MethodType, ClassObjectType } from '@/old/types';

/**
 * メソッドの実行（メソッドが存在しない場合は親クラスを探しに行く）
 * @param {object}  obj         レシーバ
 * @param {string}  className   レシーバのクラス名
 * @param {string}  method      メソッド名
 * @param {object}  [params]      パラメータの配列
 * @param {object}  [options]     キーワードパラメータのハッシュ
 * @return {object}
 */

export const exec = (
  obj: ExecObjectType,
  className: ClassObjectType,
  method: MethodType,
  params?: ParamsType<any>,
  options?: any,
): ExecObjectType | BinaryExpressionType | string => {
  // console.log([57, obj, classN, method, params, options]);
  // @ts-ignore
  if (className[method]) {
    // console.log('59');
    // @ts-ignore
    return className[method](obj, params);
  } else {
    // console.log('62');
    if (className.superClass != null) {
      return exec(obj, className.superClass, method, params, options);
    } else {
      // console.log(classN.superClass);
      throw new Error('メソッドが見つかりません');
    }
  }
};

/**
 * 2項演算子の展開および実行
 * @param {object}  left    2項演算子の左側
 * @param {string}  op      メソッド名
 * @param {object}  right   2項演算子の右側
 * @returns {object}
 */
export const binaryExec = (
  left: ExecObjectType | BinaryExpressionType,
  op: Operator,
  right: ExecObjectType | BinaryExpressionType,
): ExecObjectType | BinaryExpressionType | string => {
  // console.log([left, op, right]);
  let val1: any = left;
  let val2: any = right;
  if (left.type == 'Literal')
    val1 = { value: left.value, class: left.class, type: ObjectEnum.VARIABLE };
  else if (left.type == 'Identifier') {
    // console.log(globalObject[left.name]);
    val1 = globalObject[left.name];
  } else if (left.type == 'BinaryExpression')
    val1 = binaryExec(left.left, left.operator, left.right);

  if (right.type == 'Literal')
    val2 = {
      value: right.value,
      class: right.class,
      type: ObjectEnum.VARIABLE,
    };
  else if (right.type == 'Identifier') val2 = globalObject[right.name];
  else if (right.type == 'BinaryExpression')
    val2 = binaryExec(right.left, right.operator, right.right);
  // console.log([val1, val2]);

  return exec(val1, globalObject[val1.class] as ClassObjectType, op, [val2]);
  // メソッドの実行
  //if( global[val1.class][ op ] )   return global[val1.class][ op ]( val1, [val2] );
  //else    console.log( "Methodが見つかりません");
};
