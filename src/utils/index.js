export const isPassword = (data) => {
  let pattern = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
  if (data == '') return false;
  return pattern.test(data);
};

export const isEmail = (data) => {
  let pattern =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  if (data == '') return false;
  return pattern.test(data);
};

export const quantityFn = (arr, type) => {
  let num = 0;
  let _this = this;
  if (type === 0) {
    let ary = arr;
    let ary1 = [];
    ary.forEach((item, key) => {
      num += Number(item.amount);
      ary1.push(num.toFixed(4));
    });
    arr.forEach((item, key) => {
      item.quantityAll = ary1[key];
    });
    arr.reverse();
  } else {
    arr.forEach((item, key) => {
      num += Number(item.amount);
      item.quantityAll = num;
    });
  }
  return arr;
};
