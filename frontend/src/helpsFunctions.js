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
      .replace(/(_)/g, ' ')
      .concat('.', siparate[1])
      .replace(/\- /, '-');
    return `${summ} ₽`;
  } else {
    let summ = wholeRev
      .reverse()
      .join('')
      .replace(/(_)/g, ' ')
      .replace(/\- /, '-');
    return `${summ} ₽`;
  }
}

function formatSummColor(str) {
  if (str.includes('-')) {
    return `- ${str}`;
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

export { formatSumm, dateTransform, dateTransformForTable, formatSummColor };
