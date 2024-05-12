const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');

router.get('/categories', adminAuth, (req, res) => {
  res.send('Categories');
});

router.get('/admin/categories', adminAuth, (req, res) => {
  Category.findAll({
    raw: true,
    order: [
      ['title', 'ASC']
    ]
  }).then((categories) => {
    res.render('admin/categories/collection', {
      categories: categories
    });
  });
});

router.get('/admin/categories/add', adminAuth, (req, res) => {
  res.render('admin/categories/add');
});

router.get('/admin/categories/:id/edit', adminAuth, (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.redirect('/admin/categories');
  }

  Category.findByPk(id).then((category) => {
    if (category != undefined) {
      res.render('admin/categories/edit', {
        category: category
      });
    }
    else {
      res.redirect('/admin/categories');
    }
  });
});

router.post('/admin/categories/delete', adminAuth, (req, res) => {
  const id = req.body.id;

  if (id == undefined || isNaN(id)) {
    res.redirect('/admin/categories');
  }

  Category.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/admin/categories');
  });
});

router.post('/admin/categories/create', adminAuth, (req, res) => {
  const title = req.body.title;

  if (title == undefined) {
    res.redirect('/admin/categories/add');
  }

  Category.create({
    title: title,
    slug: slugify(title),
  }).then(() => {
    res.redirect('/admin/categories');
  });
});

router.post('/admin/categories/update', adminAuth, (req, res) => {
  const id = req.body.id;
  const title = req.body.title;

  if (id == undefined || title == undefined) {
    res.redirect('/admin/categories/add');
  }

  Category.update(
    {
      title: title,
      slug: slugify(title),
    },
    {
      where: {
        id: id
      }
    }
  ).then(() => {
    res.redirect('/admin/categories');
  });
});

module.exports = router;
