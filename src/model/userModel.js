/** @format */

const User = require("../schema/user");

module.exports = {
  saveData: async data => {
    let userData = new User(data);
    return await userData.save();
  },

  /**
   * this function basically work well when you do search and filtering  at a time
   */
  getAll: async data => {
    let page = 1;
    let limit = 1;
    let skip = page * limit;
    let sortBy = "";
    let sortObj = {};
    let filter = {};
    let resObj = {};
    if (data.page) {
      page = data.page;
      skip = limit * data.page;
    }

    /** search by salary */

    if (data.keyWord) {
      filter = {
        salary: parseInt(data.keyWord)
      };
    }

    /**
     * sorting by salary
     */

    if (data.sortBy.toString() === "asc") {
      sortObj.salary = 1;
    } else if (data.sortBy.toString() === "dsc") {
      sortObj.salary = -1;
    } else {
      sortObj = {};
    }

    /**
     * filtering
     *
     */

    if (data.filter === "less then") {
      filter = {
        salary: {
          $lt: parseInt(data.salary)
        }
      };
    } else if (data.filter === "greater than") {
      filter = {
        salary: {
          $gt: parseInt(data.salary)
        }
      };
    }
    resObj.userData = await User.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    resObj.page = page;
    resObj.totalCount = (await User.find()).length;
    return resObj;
  },

/**
  this function basically work well when you do search and filtering on same time
 * 
 */

  getAllWithSearchAndFilter: async data => {
    let page = 1;
    let limit = 1;
    let skip = page * limit;
    let sortBy = "";
    let sortObj = {};
    let filter = {};
    let resObj = {};
    let tempArr =[];
    if (data.page) {
      page = data.page;
      skip = limit * data.page;
    }

    /** search by salary */

    if (data.keyWord) {
      filter = {
        salary: parseInt(data.keyWord)
      };
    }

    /**
     * sorting by salary
     */

    if (data.sortBy.toString() === "asc") {
      sortObj.salary = 1;
    } else if (data.sortBy.toString() === "dsc") {
      sortObj.salary = -1;
    } else {
      sortObj = {};
    }

    resObj.userData = await User.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    resObj.page = page;
    resObj.totalCount = (await User.find()).length;

    /**
     * filtering 
     */

    if (data.filter === "less then" && data.salary) {
      tempArr = resObj.userData.map(o => {
        if (o.salary < data.salary) {
          return o;
        }
      });
    } else {
      tempArr = resObj.userData.map(o => {
        if (o.salary > data.salary) {
          return o;
        }
      });
    }
    resObj.userData = tempArr;
    return resObj;
  }
};
