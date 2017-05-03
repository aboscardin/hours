function Availability(userData) {
  const self = this;


  self.findAvailableWorkHours = function(userId, from, to) {
    let fromDate = new Date(from);
    let toDate = new Date(to);

    //Global constant should be defined elsewhere as standard hours might deviate from use to use (other locales?)
    const standardHours = [0, 8, 8, 8, 8, 8, 0];

    //Return any overrides that overlap with our query
    const userOverrides = self.getOverrides(userId, fromDate, toDate);

    const results = [];

    while (fromDate <= toDate) {
      //const nextDate = new Date();
      //nextDate.setDate(fromDate.getDate() + 1);

      const dayIndex = fromDate.getDay();

      const entry = {};

      let overrideHours = userOverrides.filter((or) => { return (fromDate >= new Date(or.from)) && (fromDate <= new Date(or.to))});

      let hoursReference = null;

      if (overrideHours.length > 0) {
        hoursReference = overrideHours.pop().hours;
      } else {
        hoursReference = standardHours;
      }

      entry.date = fromDate.toLocaleDateString();
      entry.hours = hoursReference[dayIndex];

      results.push(entry);

      fromDate.setDate(fromDate.getDate() + 1);
    }

    //return array of obj {date, total hours}
    return results;
  }

  /* Stub for overrides query */

  self.getOverrides = function(id, from, to) {
    const overrides = userData.filter((entry) => { return entry.user === id && from <= new Date(entry.to) && to >= new Date(entry.from) });

    //holidays - query holiday week overrides within range
    // push those to overrides
    // Should holiday weeks take precedence over user?
    // Or should users be able to have availability despite holidays?
    // Might be better to handle by adding holiday to all user overrides?

    return overrides;
  }

  return self;

};

module.exports = Availability;
