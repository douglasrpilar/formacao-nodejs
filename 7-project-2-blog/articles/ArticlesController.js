const express = require('express');
const router = express.Router();
const Article = require('./Article');
const Category = require('../categories/Category');
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/articles', adminAuth, (req, res) => {
  Article.findAll({
    include: [
      {
        model: Category,
      }
    ],
    order: [
      ['id', 'DESC']
    ]
  }).then((articles) => {
    res.render('admin/articles/collection', {
      articles: articles
    });
  });
});

router.get('/admin/articles/add', adminAuth, (req, res) => {
  Category.findAll({
    order: [
      ['title', 'ASC']
    ]
  }).then((categories) => {
    res.render('admin/articles/add', {
      categories: categories
    });
  });
});

router.get('/admin/articles/:id/edit', adminAuth, (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.redirect('/admin/articles');
  }

  Article.findByPk(id).then((article) => {
    if (article != undefined) {
      Category.findAll({
        order: [
          ['title', 'ASC']
        ]
      }).then((categories) => {
        res.render('admin/articles/edit', {
          article: article,
          categories: categories
        });
      });
    }
    else {
      res.redirect('/admin/articles');
    }
  });
});

router.post('/admin/articles/delete', adminAuth, (req, res) => {
  const id = req.body.id;

  if (id == undefined || isNaN(id)) {
    res.redirect('/admin/articles');
  }

  Article.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/admin/articles');
  });
});

router.post('/admin/articles/create', adminAuth, (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  if (title == undefined || body == undefined || category == undefined) {
    res.redirect('/admin/articles/add');
  }

  Article.create({
    title: title,
    slug: slugify(title),
    categoryId: category,
    body: body,
  }).then(() => {
    res.redirect('/admin/articles');
  });
});

router.post('/admin/articles/update', adminAuth, (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const category = req.body.category;
  const body = req.body.body;

  if (id == undefined || title == undefined) {
    res.redirect('/admin/categories/add');
  }

  Article.update(
    {
      title: title,
      slug: slugify(title),
      categoryId: category,
      body: body,
    },
    {
      where: {
        id: id
      }
    }
  ).then(() => {
    res.redirect('/admin/articles');
  });
});

module.exports = router;
