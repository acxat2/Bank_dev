function formatSumm(str) {
  str = String(str);
  const siparate = str.split('.');
  let wholeRev = [];
  let j = 1;

  for (let i = siparate[0].length; i > 0; i--) {
    if (j <= 3) {
      ++j;
      wholeRev.push(siparate[0][i - 1]);
    } else {
      j = 2;
      wholeRev.push('_');
      wholeRev.push(siparate[0][i - 1]);
    }
  }
  if (siparate[1]) {
    let summ = wholeRev
      .reverse()
      .join('')
      .replace(/(_)/g, ` `)
      .concat('.', siparate[1])
      .replace(/\- /, '-');
    return `${summ} ₽`;
  } else {
    let summ = wholeRev
      .reverse()
      .join('')
      .replace(/(_)/g, ` `)
      .replace(/\- /, '-');
    return `${summ} ₽`;
  }
}

function formatAmouth(str) {
  str = String(str);
  const siparate = str.split('.');
  let wholeRev = [];
  let j = 1;

  for (let i = siparate[0].length; i > 0; i--) {
    if (j <= 3) {
      ++j;
      wholeRev.push(siparate[0][i - 1]);
    } else {
      j = 2;
      wholeRev.push('_');
      wholeRev.push(siparate[0][i - 1]);
    }
  }
  if (siparate[1]) {
    let summ = wholeRev
      .reverse()
      .join('')
      .replace(/(_)/g, `&nbsp;`)
      .concat('.', siparate[1])
      .replace(/\- /, '-');
    return summ;
  } else {
    let summ = wholeRev
      .reverse()
      .join('')
      .replace(/(_)/g, `&nbsp;`)
      .replace(/\- /, '-');
    return summ;
  }
}

function formatSummColor(str) {
  if (str.includes('-')) {
    return `${str}`;
  } else {
    return `+ ${str}`;
  }
}

function dateTransform(result) {
  if (result.transactions.length > 0) {
    let day = result.transactions[0].date.split('T')[0].split('-')[2];
    let month = result.transactions[0].date.split('T')[0].split('-')[1];
    let year = result.transactions[0].date.split('T')[0].split('-')[0];
    switch (month) {
      case '01':
        month = 'января';
        break;
      case '02':
        month = 'февраля';
        break;
      case '03':
        month = 'марта';
        break;
      case '04':
        month = 'апреля';
        break;
      case '05':
        month = 'мая';
        break;
      case '06':
        month = 'июня';
        break;
      case '07':
        month = 'июля';
        break;
      case '08':
        month = 'августа';
        break;
      case '09':
        month = 'сентября';
        break;
      case '10':
        month = 'октября';
        break;
      case '11':
        month = 'ноября';
        break;
      case '12':
        month = 'декабря';
        break;
    }
    return {
      day: day,
      month: month,
      year: year,
    };
  } else {
    return {
      day: 'Действия не совершались',
      month: '',
      year: '',
    };
  }
}

function dateTransformForTable(date) {
  let day = date.split('T')[0].split('-').reverse().join('.');
  return day;
}

function definSign(transaction, account) {
  if (transaction.from === account) {
    return `- ${transaction.amount}`;
  } else return transaction.amount;
}

function arrSumm(arr) {
  let summ = 0;
  for (let magor of arr) {
    summ = summ + magor;
  }
  return summ;
}

function sortTransaction(result, arrMonths) {
  let arrMagor = new Map();
  let arrMinor = new Map();
  let magorKey = [];
  let magorValue = [];
  let minorKey = [];
  let minorValue = [];
  let i = 0;
  let date = arrMonths[i];

  arrMagor.set(date, []);
  arrMinor.set(date, []);
  magorKey.push(date);
  minorKey.push(date);

  for (let transaction of result.transactions) {
    back: if (transaction.date.slice(0, 7) >= date) {
      if (transaction.date.slice(0, 7) === arrMonths[i + 1]) {
        magorValue.push(arrSumm(arrMagor.get(date)));
        minorValue.push(arrSumm(arrMinor.get(date)));
        i++;
        date = arrMonths[i];
        arrMagor.set(date, []);
        arrMinor.set(date, []);
        magorKey.push(date);
        minorKey.push(date);
      } else {
        if (transaction.date.slice(0, 7) > arrMonths[i + 1]) {
          magorValue.push(arrSumm(arrMagor.get(date)));
          minorValue.push(arrSumm(arrMinor.get(date)));
          i++;
          date = arrMonths[i];
          arrMagor.set(date, []);
          arrMinor.set(date, []);
          magorKey.push(date);
          minorKey.push(date);
          break back;
        }
      }
      if (transaction.to === result.account) {
        arrMagor.get(date).push(transaction.amount);
      } else arrMinor.get(date).push(transaction.amount);
    }
  }
  if (date) {
    magorValue.push(arrSumm(arrMagor.get(date)));
    minorValue.push(arrSumm(arrMinor.get(date)));
  }
  return {
    magorKey,
    magorValue,
    minorKey,
    minorValue,
  };
}

function createArrMonths(n) {
  let arrDate = [];
  let m12 = 12;
  let m = n;
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  for (let i = 1; i <= m; i++) {
    if (month >= 1) {
      if (String(month).length !== 2) {
        arrDate.push(year + '-' + '0' + month);
      } else arrDate.push(year + '-' + month);
      month--;
      if (month === 0) {
        month = m12;
        year = year - 1;
      }
    }
  }

  return arrDate.reverse();
}

export {
  formatSumm,
  dateTransform,
  dateTransformForTable,
  formatSummColor,
  definSign,
  formatAmouth,
  arrSumm,
  sortTransaction,
  createArrMonths,
};
