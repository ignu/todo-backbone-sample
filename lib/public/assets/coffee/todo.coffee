class Todo extends Backbone.Model
  url: "/todos"

class TodoCollection extends Backbone.Collection
  url: "/todos"

class TodoView extends Backbone.View
  tagName: "li"
  template: """<%= model.get("text") %> <a>x</a> <span>edit</span>
  """
  initialize: ->
    @model.on("change", @render)
  events:
    "click a" : "delete"
    "click span" : "edit"
  delete: =>
    @model.destroy()
    $(@el).fadeOut()
  edit: =>
    view = new TodoFormView model: @model
    $(@el).append view.render().el
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
    @collection.on('add', @render)
    @collection.on('reset', @render)
  render: =>
    $(@el).html _.template(@template, {collection: @collection})
    @

class TodoCollectionView extends Backbone.View
  tagName: "ul"
  initialize: ->
    @collection.on('reset', @addAll)
    @collection.on('add', @addOne)
  render: =>
    @
  addOne: (todo) =>
    html = new TodoView({model: todo}).render().el
    $(@el).append(html)
  addAll: =>
    @collection.each @addOne

class TodoFormView extends Backbone.View
  template: """
  <form>
    <input value="<%= model.get("text") %>" />
    <button>Save</button>
  </form>
  """
  events:
    "click button" : "add"
  add: (e) =>
    e.preventDefault()
    @model.set("text", $(@el).find("input").val())
    @model.save()
    @collection.add(@model) unless @model.collection
    $(@el).remove()
    window.router.navigate("")
  render: =>
    $(@el).html _.template(@template, {model: @model})
    $(@el).find("input").focus()
    @

class TodoRouter extends Backbone.Router
  routes:
    "" : "index"
    "help" : "help"
    "new" : "new"

  initialize: ->
    @collection = new TodoCollection
    @collection.fetch()
    html = new TodoCollectionHeaderView(collection: @collection).render().el
    $("#todo-container").append html
    $("#todo-container").append new TodoCollectionView(collection: @collection).el

  help: ->
    alert 'Here are your todos!'

  new: ->
    html = new TodoFormView(model: new Todo, collection: @collection).render().el
    $("#todo-container").append(html)

  index: ->

$ ->
  window.router = new TodoRouter
  Backbone.history.start()
