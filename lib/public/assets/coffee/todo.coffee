class Todo extends Backbone.Model
  urlRoot: "/todos"
window.Todo = Todo

class TodoCollection extends Backbone.Collection
  model: Todo
  url: "/todos"



class TodoView extends Backbone.View
  tagName: "li"
  template: """
    <%= todo.get("text") %> <a>x</a>
  """
  events:
    "click a" : "delete"
  delete: =>
    @model.destroy()
    $(@el).remove()
  render: =>
    $(@el).html _.template(@template, todo: @model)
    @



class TodoCollectionView extends Backbone.View
  template: """
     <h1><%= collection.length %> Todos</h1>
     <ul></ul>
  """
  initialize: ->
    @collection.on('reset', @render)
    @collection.on('reset', @addAll)
  render: =>
    $(@el).html(_.template @template, collection: @collection)
    @
  addAll: =>
    @collection.each (todo) =>
      todoHtml = new TodoView( model: todo).render().el
      $(@el).find("ul").append todoHtml



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
    view = new TodoCollectionView(collection: @collection)
    $("#todo-container").html view.render().el

$ ->
  router = new TodoRouter
  Backbone.history.start()
