var _ = require("underscore");

var builder = {
  /**
   * @param table {string} - Table name
   * @param data {object} - columns values
   * @returns {string}
   */
  insert: function (table, data) {
    var query = "INSERT INTO " + table + " ",
      columns = "(",
      values = "(";

    _.each(data, function (value, key) {
      if (value) {
        columns += key + ", ";
        values += typeof value === "string" ? ("'" + value + "'") : value;
        values += ", ";
      }
    });

    columns = columns.substr(0, columns.length - 2);
    columns += ")";
    values = values.substr(0, values.length - 2);
    values += ")";

    query += columns + " VALUES " + values;

    return query;
  },

  /**
   * @param table {string} - Table name
   * @param data {object} - columns values
   * @param [where] {object} - conditions
   * @returns {string}
   */
  update: function (table, data, where) {
    var query = "UPDATE " + table + " SET ",
        values = "";

    _.each(data, function (value, key) {
      if (value || value === null) {
        if (typeof value === "string") {
          value = "'" + value + "'"
        } else if (value === null || ""){
          value = "NULL";
        }
        values += key + " = " + value + ", ";
      }
    });
    values = values.substr(0, values.length - 2);
    query += values;

    if(where){
      var conditions = " WHERE ";
      _.each(where, function (value, key) {
        if (value) {
          conditions += key + " = " + (typeof value === "string" ? ("'" + value + "'") : value) + ", ";
        }
      })
      conditions = conditions.substr(0, conditions.length - 2);
      query += conditions;
    }

    return query;
  },

  /**
   * @param table {string} - Table name
   * @param fields {string} - fields for select
   * @param [where] {object} - conditions
   * @returns {string}
   */
  select: function (table, fields, where) {
    var query = "SELECT " + fields + " FROM " + table;

    if(where){
      var conditions = " WHERE ";
      _.each(where, function (value, key) {
        if (value) {
          conditions += key + " = " + (typeof value === "string" ? ("'" + value + "'") : value) + ", ";
        }
      });
      conditions = conditions.substr(0, conditions.length - 2);
      query += conditions;
    }

    return query;
  },

  /**
   *
   * @param table {string} - Table name
   * @param where {object} - conditions
   * @returns {string}
   */
  delete: function (table, where) {
    var query = "DELETE FROM " + table;

    var conditions = " WHERE ";
    _.each(where, function (value, key) {
      if (value) {
        conditions += key + " = " + (typeof value === "string" ? ("'" + value + "'") : value) + ", ";
      }
    });
    conditions = conditions.substr(0, conditions.length - 2);
    query += conditions;

    return query;
  }
};

module.exports = builder;