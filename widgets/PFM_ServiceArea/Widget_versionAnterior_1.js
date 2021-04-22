define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/SpatialReference", "esri/tasks/FeatureSet", "esri/tasks/ServiceAreaTask", "esri/tasks/ServiceAreaParameters", "esri/tasks/QueryTask", "esri/tasks/query", "esri/geometry/Point", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/graphic", "esri/Color"], function (declare, BaseWidget, SpatialReference, FeatureSet, ServiceAreaTask, ServiceAreaParameters, QueryTask, Query, Point, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Graphic, Color) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

        // Custom widget code goes here

        baseClass: 'pfm-service-area',
        // this property is set by the framework when widget is loaded.
        // name: 'PFM_ServiceArea',
        // add additional properties here

        //methods to communication with app container:
        postCreate: function postCreate() {
            this.inherited(arguments);
            console.log('PFM_ServiceArea::postCreate');
        },

        // startup: function() {
        //   this.inherited(arguments);
        //   console.log('PFM_ServiceArea::startup');
        // },

        onOpen: function onOpen() {
            console.log('PFM_ServiceArea::onOpen');

            var miMapa = this.map;
            console.log(miMapa);

            // var miMapaURL = miMapa.url;
            // console.log(miMapaURL);

            for (var i = 0; i < miMapa.itemInfo.itemData.operationalLayers.length; i++) {

                var misCapas = [];
                console.log("La capa iterada: ", miCapa);

                if (i > 1) {
                    misCapas.push(miMapa.itemInfo.itemData.operationalLayers[i]);
                }
            };

            // miMapa.

            miMapa.on("click", function (evento) {

                miMapa.graphics.clear();

                var miSimbolo = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1), new Color([0, 0, 0]));

                var miPunto = new Point(evento.mapPoint.x, evento.mapPoint.y, miMapa.spatialReference);

                var ubicacion = new Graphic(miPunto, miSimbolo);
                miMapa.graphics.add(ubicacion);

                var entidades = [];
                entidades.push(ubicacion);

                var ubicaciones = new FeatureSet();
                ubicaciones.features = entidades;

                console.log(ubicaciones);

                tareaAreaDeServicio = new ServiceAreaTask("https://localhost:6443/arcgis/rest/services/PFM/20210315_pruebaPublicarServiciosRutas/NAServer/Service%20Area");

                parametrosAreaDeServicio = new ServiceAreaParameters();

                var intervalo1 = dojo.byId("intervalo1").value;
                var intervalo2 = dojo.byId("intervalo2").value;
                var intervalo3 = dojo.byId("intervalo3").value;

                parametrosAreaDeServicio.facilities = ubicaciones;
                parametrosAreaDeServicio.defaultBreaks = [intervalo1, intervalo2, intervalo3];
                parametrosAreaDeServicio.outSpatialReference = miMapa.spatialReference;
                parametrosAreaDeServicio.returnFacilities = false;
                parametrosAreaDeServicio.impedanceAttribute = "Length";

                console.log("parametrosAreaDeServicio", parametrosAreaDeServicio);

                tareaAreaDeServicio.solve(parametrosAreaDeServicio, function (resultado) {

                    miMapa.graphics.clear();

                    console.log("resultados:", resultado);

                    var simboloPoligono = new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color([255, 255, 255]), 1), new Color([255, 0, 0, 0.25]));

                    dojo.forEach(resultado.serviceAreaPolygons, function (areaServicio) {

                        console.log("Añadiendo polígono de area de servicio: ", areaServicio);

                        areaServicio.setSymbol(simboloPoligono);
                        miMapa.graphics.add(areaServicio);
                    });

                    var poligonoConsulta = resultado.serviceAreaPolygons[0].geometry;
                    miMapa.setExtent(poligonoConsulta.getExtent(), true);

                    var consulta = new Query();
                    consulta.where = "1=1";
                    consulta.outFields = ["*"];
                    consulta.geometry = poligonoConsulta;
                    consulta.returnGeometry = true;
                    consulta.outSpatialReference = new SpatialReference(102100);

                    for (var i = 0; i < miMapa.itemInfo.itemData.operationalLayers.length; i++) {

                        var miURLConsulta = miMapa.itemInfo.itemData.operationalLayers[i].url;

                        var simbolo = miMapa.itemInfo.itemData.operationalLayers[0].itemProperties.layerDefinition.drawingInfo.renderer.symbol;

                        var miTareaDeConsulta = new QueryTask(miURLConsulta);

                        miTareaDeConsulta.execute(consulta, function (resultado) {

                            console.log("Resultado de la querytask: ", resultado);

                            if (resultado.features.length > 0) {

                                for (var i = 0; i < resultado.features.length; i++) {

                                    var geometria = resultado.features[i].geometry;

                                    var simboloGenerico = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1), new Color([0, 0, 0]));

                                    punto = new Graphic(geometria, simboloGenerico);

                                    miMapa.graphics.add(punto);
                                }
                            } else {
                                return;
                            }
                        });
                    }
                }, function (err) {
                    console.log(err.message);
                });
            });

            // itemInfo.itemData.operationalLayers[0].itemProperties.layerDefinition.drawingInfo.renderer.symbol

        }

        // onClose: function(){
        //   console.log('PFM_ServiceArea::onClose');
        // },

        // onMinimize: function(){
        //   console.log('PFM_ServiceArea::onMinimize');
        // },

        // onMaximize: function(){
        //   console.log('PFM_ServiceArea::onMaximize');
        // },

        // onSignIn: function(credential){
        //   console.log('PFM_ServiceArea::onSignIn', credential);
        // },

        // onSignOut: function(){
        //   console.log('PFM_ServiceArea::onSignOut');
        // }

        // onPositionChange: function(){
        //   console.log('PFM_ServiceArea::onPositionChange');
        // },

        // resize: function(){
        //   console.log('PFM_ServiceArea::resize');
        // }

        //methods to communication between widgets:

    });
});
//# sourceMappingURL=Widget_versionAnterior_1.js.map
