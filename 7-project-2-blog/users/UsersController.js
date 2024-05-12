const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');
const adminAuth = require('../middlewares/adminAuth');
const locals = require('../middlewares/locals');

router.get('/admin/users', adminAuth, (req, res) => {
  User.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then((users) => {
    res.render('admin/users/collection', {
      users: users
    });
  });
});

router.get('/admin/users/:id/edit', adminAuth, (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.redirect('/admin/users');
  }

  User.findByPk(id).then((user) => {
    if (user != undefined) {
      res.render('admin/users/edit', {
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
    else {
      res.redirect('/admin/users');
    }
  });
});

router.get('/admin/users/add', adminAuth, (req, res) => {
  res.render('admin/users/add');
});

router.post('/admin/users/create', adminAuth, (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (name == undefined || email == undefined || password == undefined) {
    res.redirect('/admin/users/add');
  }

  User.findOne({
    where: {
      email: email
    }
  }).then( (user) => {
    if (user == undefined) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      User.create({
        name: name,
        email: email,
        password: hash,
      }).then(() => {
        res.redirect('/admin/users');
      });
    }
    else {
      res.redirect('/admin/users/add');
    }
  });
});

router.post('/admin/users/update', adminAuth, (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (id == undefined || name == undefined || email == undefined || password == undefined) {
    res.redirect('/admin/users');
  }

  var fields = {
    name: name,
    email: email,
  }

  if (password != '') {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    fields.password = hash;
  }

  User.update(
    fields,
    {
      where: {
        id: id
      }
    }
  ).then(() => {
    res.redirect('/admin/users');
  });
});


router.post('/admin/users/delete', adminAuth, (req, res) => {
  const id = req.body.id;

  if (id == undefined || isNaN(id)) {
    res.redirect('/admin/users');
  }

  User.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/admin/users');
  });
});

router.get('/logout', adminAuth, (req, res) => {
  req.session.user = undefined;
  res.redirect('/login');
});

router.get('/login', locals, (req, res) => {
  if (req.session.user == undefined) {
    res.render('admin/users/login');
  }
  else {
    res.redirect('/admin/articles');
  }
});

router.post('/authenticate', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: {
      email: email,
    }
  }).then((user) => {
    if (user != undefined) {
      const valid = bcrypt.compareSync(password, user.password);

      if (valid) {
        req.session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        }
        res.redirect('/admin/articles');
      }
      else {
        res.redirect('/login');
      }
    }
    else {
      res.redirect('/login');
    }
  });
});

module.exports = router;