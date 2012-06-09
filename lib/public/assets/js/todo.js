(function() {
  var Todo, TodoCollection, TodoCollectionHeaderView, TodoCollectionView, TodoFormView, TodoRouter, TodoView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Todo = (function(_super) {

    __extends(Todo, _super);

    function Todo() {
      Todo.__super__.constructor.apply(this, arguments);
    }

    Todo.prototype.url = "/todos";

    return Todo;

  })(Backbone.Model);

  TodoCollection = (function(_super) {

    __extends(TodoCollection, _super);

    function TodoCollection() {
      TodoCollection.__super__.constructor.apply(this, arguments);
    }

    TodoCollection.prototype.url = "/todos";

    return TodoCollection;

  })(Backbone.Collection);

  TodoView = (function(_super) {

    __extends(TodoView, _super);

    function TodoView() {
      this.render = __bind(this.render, this);
      this["delete"] = __bind(this["delete"], this);
      TodoView.__super__.constructor.apply(this, arguments);
    }

    TodoView.prototype.tagName = "li";

    TodoView.prototype.template = "<%= model.get(\"text\") %> <a>x</a>";

    TodoView.prototype.events = {
      "click a": "delete"
    };

    TodoView.prototype["delete"] = function() {
      this.model.destroy();
      return $(this.el).fadeOut();
    };

    TodoView.prototype.render = function() {
      var html;
      html = _.template(this.template, {
        model: this.model
      });
      $(this.el).html(html);
      return this;
    };

    return TodoView;

  })(Backbone.View);

  TodoCollectionHeaderView = (function(_super) {

    __extends(TodoCollectionHeaderView, _super);

    function TodoCollectionHeaderView() {
      this.render = __bind(this.render, this);
      TodoCollectionHeaderView.__super__.constructor.apply(this, arguments);
    }

    TodoCollectionHeaderView.prototype.template = "<h1><%= collection.length %> Things to do</h1>";

    TodoCollectionHeaderView.prototype.initialize = function() {
      this.collection.on('remove', this.render);
      this.collection.on('add', this.render);
      return this.collection.on('reset', this.render);
    };

    TodoCollectionHeaderView.prototype.render = function() {
      $(this.el).html(_.template(this.template, {
        collection: this.collection
      }));
      return this;
    };

    return TodoCollectionHeaderView;

  })(Backbone.View);

  TodoCollectionView = (function(_super) {

    __extends(TodoCollectionView, _super);

    function TodoCollectionView() {
      this.addAll = __bind(this.addAll, this);
      this.addOne = __bind(this.addOne, this);
      this.render = __bind(this.render, this);
      TodoCollectionView.__super__.constructor.apply(this, arguments);
    }

    TodoCollectionView.prototype.tagName = "ul";

    TodoCollectionView.prototype.initialize = function() {
      this.collection.on('reset', this.addAll);
      return this.collection.on('add', this.addOne);
    };

    TodoCollectionView.prototype.render = function() {
      return this;
    };

    TodoCollectionView.prototype.addOne = function(todo) {
      var html;
      html = new TodoView({
        model: todo
      }).render().el;
      return $(this.el).append(html);
    };

    TodoCollectionView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };

    return TodoCollectionView;

  })(Backbone.View);

  TodoFormView = (function(_super) {

    __extends(TodoFormView, _super);

    function TodoFormView() {
      this.render = __bind(this.render, this);
      this.add = __bind(this.add, this);
      TodoFormView.__super__.constructor.apply(this, arguments);
    }

    TodoFormView.prototype.template = "<form>\n  <input value=\"<%= model.get(\"text\") %>\" />\n  <button>Add Todo</button>\n</form>";

    TodoFormView.prototype.events = {
      "click button": "add"
    };

    TodoFormView.prototype.add = function(e) {
      e.preventDefault();
      this.model.set("text", $(this.el).find("input").val());
      this.model.save();
      this.collection.add(this.model);
      $(this.el).remove();
      return window.router.navigate("");
    };

    TodoFormView.prototype.render = function() {
      $(this.el).html(_.template(this.template, {
        model: this.model
      }));
      $(this.el).find("input").focus();
      return this;
    };

    return TodoFormView;

  })(Backbone.View);

  TodoRouter = (function(_super) {

    __extends(TodoRouter, _super);

    function TodoRouter() {
      TodoRouter.__super__.constructor.apply(this, arguments);
    }

    TodoRouter.prototype.routes = {
      "": "index",
      "help": "help",
      "new": "new"
    };

    TodoRouter.prototype.initialize = function() {
      var html;
      this.collection = new TodoCollection;
      this.collection.fetch();
      html = new TodoCollectionHeaderView({
        collection: this.collection
      }).render().el;
      $("#todo-container").append(html);
      return $("#todo-container").append(new TodoCollectionView({
        collection: this.collection
      }).el);
    };

    TodoRouter.prototype.help = function() {
      return alert('Here are your todos!');
    };

    TodoRouter.prototype["new"] = function() {
      var html;
      html = new TodoFormView({
        model: new Todo,
        collection: this.collection
      }).render().el;
      return $("#todo-container").append(html);
    };

    TodoRouter.prototype.index = function() {};

    return TodoRouter;

  })(Backbone.Router);

  $(function() {
    window.router = new TodoRouter;
    return Backbone.history.start();
  });

}).call(this);
