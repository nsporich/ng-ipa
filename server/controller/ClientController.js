var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();

//GET Routes
var routes = function() {
  router.route('/')
    .get(function(req, res) {
      conn.connect().then(function() {
        var sqlQuery = "SELECT * FROM Clients";
        var req = new sql.Request(conn);
        req.query(sqlQuery).then(function(recordset) {
          res.json(recordset.recordset);
          conn.close();
        })
        .catch(function(err) {
          conn.close();
          res.status(400).send("Error getting data");
        })
      })
      .catch(function(err) {
        conn.close();
        res.status(400).send("Error getting data");
      });
  });

  router.route('/:id')
    .get(function(req, res) {
      var _clientID = req.params.id;
      conn.connect().then(function() {
        var sqlQuery = "SELECT * FROM Clients where id = " + _clientID;
        var req = new sql.Request(conn);
        req.query(sqlQuery).then(function(recordset) {
          res.json(recordset.recordset);
          conn.close();
        })
        .catch(function(err) {
          conn.close();
          res.status(400).send("Error getting data");
        })
      })
      .catch(function(err) {
        conn.close();
        res.status(400).send("Error getting data");
      });
  });

//INSERT Route
  router.route('/')
    .post(function(req, res) {
      conn.connect().then(function() {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(function() {
          var request = new sql.Request(transaction);
          request.input("Alias", sql.VarChar(100), req.body.Alias)
          request.input("CompanyName", sql.VarChar(500), req.body.CompanyName)
          request.input("AppleCertificate", sql.VarChar(500), req.body.AppleCertificate)
          request.input("ActivationName", sql.VarChar(100), req.body.ActivationName)
          request.input("ActivationCode", sql.VarChar(100), req.body.ActivationCode)
          request.input("EncryptedName", sql.VarChar(250), req.body.EncryptedName)
          request.input("EncryptedCode", sql.VarChar(250), req.body.EncryptedCode)
          request.input("ProfileFolder", sql.VarChar(100), req.body.ProfileFolder)
          request.input("Active", sql.Bit, req.body.Active)
          request.execute("usp_InsertClient").then(function() {
            transaction.commit().then(function() {
              conn.close();
              res.status(200).send(req.body);
            }).catch(function(err) {
              conn.close();
              res.status(400).send("Error inserting data");
            });
          }).catch(function(err) {
            conn.close();
            res.status(400).send("Error inserting data");
          });
        }).catch(function(err) {
          conn.close();
          res.status(400).send("Error inserting data");
        });
      }).catch(function(err) {
        conn.close();
        res.status(400).send("Error inserting data");
      });
  });

//UPDATE Route
  router.route('/:id')
    .put(function (req, res) {
      var _clientID = req.params.id;
      conn.connect().then(function() {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(function () {
          var request = new sql.Request(transaction);
          request.input("id", sql.Int, _clientID)
          request.input("Alias", sql.VarChar(100), req.body.Alias)
          request.input("CompanyName", sql.VarChar(500), req.body.CompanyName)
          request.input("AppleCertificate", sql.VarChar(500), req.body.AppleCertificate)
          request.input("ActivationName", sql.VarChar(100), req.body.ActivationName)
          request.input("ActivationCode", sql.VarChar(100), req.body.ActivationCode)
          request.input("EncryptedName", sql.VarChar(250), req.body.EncryptedName)
          request.input("EncryptedCode", sql.VarChar(250), req.body.EncryptedCode)
          request.input("ProfileFolder", sql.VarChar(100), req.body.ProfileFolder)
          request.input("Active", sql.Bit, req.body.Active)
          request.execute("usp_UpdateClient").then(function() {
            transaction.commit().then(function () {
                conn.close();
                res.status(200).send(req.body);
            }).catch(function(err) {
                conn.close();
                res.status(400).send("Error updating data");
            });
          }).catch(function(err) {
              conn.close();
              res.status(400).send("Error updating data");
          });
        }).catch(function(err) {
            conn.close();
            res.status(400).send("Error updating data");
        });
      }).catch(function(err) {
          conn.close();
          res.status(400).send("Error updating data");});
  });

//DELETE Route
  router.route('/:id')
    .delete(function(req, res) {
      var _clientID = req.params.id;
      conn.connect().then(function() {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(function() {
          var request = new sql.Request(transaction);
          request.input("id", sql.Int, _clientID)
          request.execute("usp_DeleteClient").then(function() {
            transaction.commit().then(function() {
              conn.close();
              res.status(200).json("Deleted ClientID: " + _clientID);
            }).catch(function() {
              conn.close();
              res.status(400).send("Error deleting data");
            });
          }).catch(function() {
              conn.close();
              res.status(400).send("Error deleting data");
          });
        }).catch(function() {
          conn.close();
          res.status(400).send("Error deleting data");
        });
      })
    });

  return router;

};

module.exports = routes;