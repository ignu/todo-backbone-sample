class Todo extends Backbone.Model
  url: "/todos"

class TodoCollection extends Backbone.Collection
  url: "/todos"

class TodoView extends Backbone.View
  tagName: "li"
  template: """<%= model.get("text") %> <a>x</a>
  """
  events:
    "click a" : "delete"
  delete: =>
    @model.destroy()
    $(@el).fadeOut()
  render: =>
    html = _.template(@template, {model: @model})
    $(@el).html(html)
    @

class TodoCollectionHeaderView extends Backbone.View
  template: """
  <h1><%= collection.length %> Things to do</h1>
  """
  initialize: ->
    @collection.on('remove', @render)
    @collection.on('reset', @render)
  render: =>
    $(@el).html _.template(@template, {collection: @collection})
    @

class TodoCollectionView extends Backbone.View
  tagName: "ul"
  initialize: ->
    @collection.on('reset', @addAll)
  render: =>
    @
  addAll: =>
    @collection.each (todo) =>
      html = new TodoView({model: todo}).render().el
      $(@el).append(html)

class TodoRouter extends Backbone.Router
  routes:
    "" : "index"
    "help" : "help"

  initialize: ->
    @collection = new TodoCollection
    @collection.fetch()

  help: ->
    alert 'Here are your todos!'


  index: ->
    html = new TodoCollectionHeaderView(collection: @collection).render().el
    $("#todo-container").append html
    $("#todo-container").append new TodoCollectionView(collection: @collection).el

$ ->
  router = new TodoRouter
  Backbone.history.start()
