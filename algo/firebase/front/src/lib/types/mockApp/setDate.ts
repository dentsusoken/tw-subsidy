const setYears = () => {
  const dataYears = [];

  for (let i = new Date().getFullYear(); i >= 1970; i--) {
    dataYears.push(i.toString() + '年');
  }
  return dataYears;
};

const setMonths = () => {
  const dataMonths = [];

  for (let i = 1; i <= 12; i++) {
    dataMonths.push(i.toString() + '月');
  }
  return dataMonths;
};

export const years = setYears();
export const months = setMonths();
