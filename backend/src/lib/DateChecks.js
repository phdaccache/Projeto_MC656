class DateChecks {
  static formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static isBeforeToday(formattedDate) {
    const today = new Date();
    return formattedDate < DateChecks.formatDate(today);
  }

  static isMoreThan1Year(formattedDate) {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 1);
    return formattedDate > DateChecks.formatDate(today);
  }
}

module.exports = DateChecks;
