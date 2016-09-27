var gameParameters = new GameParameters(11);
var data = new GameData();
var view = new View(data);
var model = new Model(data);
view.init(function(args) {model.update.call(model, args)});
model.init(function(args) {view.update.call(view, args)});