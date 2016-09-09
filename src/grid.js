function Grid(width, height) {
    this.width = width;
    this.height = height;

    var data = {
        title: "Constructing HTML Elements"
    }
    var template = [
        '<div class="tutorial">',
            '<h1 class="tutorial-heading">{{title}}<h1>',
        '</div>'
    ].join("\n");

    var html = Mustache.render(template, data);
    $("body").append(html);
}