function Grid(width, height) {
    this.width = width;
    this.height = height;

    var view = {
        title: "Joe",
        calc: function () {
            return 2 + 4;
        }
    };

    var output = Mustache.render("{{title}} spends {{calc}}", view);

    // this.div = document.createElement('div');

    // this.div.appendChild(document.createTextNode('YO'));
    // document.body.appendChild(this.div);
}