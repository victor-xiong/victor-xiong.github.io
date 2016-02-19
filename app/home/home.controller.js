(function () {
    angular
        .module('home')
        .controller('HomeController', HomeController);

    function HomeController () {
        var vm = this;

        vm.createMap = function (elementCSS) {
            var width = 960,
                height = 480;

            var projection,
                data = "../data/",
                cityData = "_cities.csv",
                nation;

            if (elementCSS.indexOf("us") > -1) {
                projection = d3.geo.mercator()
                               .center([84, 38])
                               .scale(800)
                               .rotate([-180, 0]);
                cityData = data + "us" + cityData;
                data += "us.json";
                nation = "us";
            } else if (elementCSS.indexOf("china") > -1) {
                projection = d3.geo.mercator()
                               .center([-75, 38])
                               .scale(550)
                               .rotate([-180, 0]);
                cityData = data + "china" + cityData;
                data += "china.json";
                nation = "china";
            }

            var svg = d3.select(elementCSS).append("svg")
                        .attr("width", width)
                        .attr("height", height);

            var path = d3.geo.path()
                             .projection(projection);

            var g = svg.append("g");

            var div = d3.select("body").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0);

            d3.json(data, function(error, country) {
                var states = (nation === "us") ? country.objects.states : country.objects.provinces;
                g.selectAll("path")
                 .data(topojson.feature(country, states).features)
                 .enter()
                 .append("path")
                 .attr("d", path);

                d3.csv(cityData, function(error, data) {
                    g.selectAll("circle")
                     .data(data)
                     .enter()
                     .append("circle")
                     .attr("cx", function(d) {
                        return projection([d.lon, d.lat])[0];
                     })
                     .attr("cy", function(d) {
                        return projection([d.lon, d.lat])[1];
                     })
                     .attr("r", 3.5)
                     .style("fill", "#f6be00")
                     .on("mouseover", function(d) {
                        div.transition()
                           .duration(200)
                           .style("opacity", .9);

                        div.html(d.city)
                           .style("left", (d3.event.pageX) + "px")
                           .style("top", (d3.event.pageY - 28) + "px");
                     })
                     .on("mouseout", function(d) {
                        div.transition()
                           .duration(500)
                           .style("opacity", 0);
                     });
                 });
            });

            var zoom = d3.behavior.zoom()
                                  .on("zoom", function() {
                                      g.attr("transform", "translate(" +
                                             d3.event.translate.join(",") + ")scale(" +
                                             d3.event.scale + ")");

                                      g.selectAll("path")
                                       .attr("d", path.projection(projection));
                                  });

            svg.call(zoom);
        };
    }
})();
