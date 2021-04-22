define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/SpatialReference", "esri/layers/layer", "esri/tasks/FeatureSet", "esri/tasks/ServiceAreaTask", "esri/tasks/ServiceAreaParameters", "esri/tasks/QueryTask", "esri/tasks/query", "esri/toolbars/draw", "esri/geometry/Point", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/graphic", "esri/Color", "dojo/on"], function (declare, BaseWidget, SpatialReference, Layer, FeatureSet, ServiceAreaTask, ServiceAreaParameters, QueryTask, Query, Draw, Point, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Graphic, Color, on) {
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

                              for (var i = 0; i < miMapa.itemInfo.itemData.operationalLayers.length; i++) {

                                        if (i <= 1) {

                                                  console.log("La capa " + i + " no se oculta.");
                                        } else {

                                                  var capaIterada = miMapa.itemInfo.itemData.operationalLayers[i];
                                                  capaIterada[visibility = true];
                                                  console.log("La capa " + i + " se ha ocultado.");
                                        };
                              };

                              // dojo.forEach(miMapa.itemInfo.itemData.operationalLayers, function(capaIterada){
                              //   console.log("La capa iterada: ", capaIterada);
                              //   capaIterada.hide();
                              // });

                              var miPunto;
                              var miUbicacion;

                              console.log(miPunto);

                              on(dojo.byId("ubicacion"), "click", guardarUbicacion);

                              function guardarUbicacion() {

                                        miMapa.graphics.clear();

                                        var herramientaDibujo = new Draw(miMapa);
                                        herramientaDibujo.activate(Draw.POINT);
                                        herramientaDibujo.on("draw-end", crearPunto);

                                        function crearPunto(evento) {

                                                  miPunto = new Point(evento.geometry);

                                                  var miSimboloUbicacion = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1), new Color([255, 255, 255]));

                                                  miUbicacion = new Graphic(miPunto, miSimboloUbicacion);
                                                  miMapa.graphics.add(miUbicacion);

                                                  herramientaDibujo.deactivate();
                                        };
                              };

                              dojo.forEach(this.seleccionCapas, function (parametro) {
                                        console.log(parametro);
                              });

                              var capa1 = this.capa1;
                              var capa2 = this.capa2;
                              var capa3 = this.capa3;
                              var capa4 = this.capa4;
                              var capa5 = this.capa5;
                              var capa6 = this.capa6;
                              var capa7 = this.capa7;
                              var capa8 = this.capa8;
                              var capa9 = this.capa9;
                              var capa10 = this.capa10;
                              var capa11 = this.capa11;
                              var capa12 = this.capa12;
                              var capa13 = this.capa13;
                              var capa14 = this.capa14;
                              var capa15 = this.capa15;

                              var errorUbicacion = this.hayQueSeleccionarUbicacion;

                              on(dojo.byId("ejecutar"), "click", generarAreaServicio);

                              function generarAreaServicio() {

                                        var capasSeleccionadas = [];

                                        if (capa1.checked == true) {
                                                  capasSeleccionadas.push(capa1.value);
                                        };
                                        if (capa2.checked == true) {
                                                  capasSeleccionadas.push(capa2.value);
                                        };
                                        if (capa3.checked == true) {
                                                  capasSeleccionadas.push(capa3.value);
                                        };
                                        if (capa4.checked == true) {
                                                  capasSeleccionadas.push(capa4.value);
                                        };
                                        if (capa5.checked == true) {
                                                  capasSeleccionadas.push(capa5.value);
                                        };
                                        if (capa6.checked == true) {
                                                  capasSeleccionadas.push(capa6.value);
                                        };
                                        if (capa7.checked == true) {
                                                  capasSeleccionadas.push(capa7.value);
                                        };
                                        if (capa8.checked == true) {
                                                  capasSeleccionadas.push(capa8.value);
                                        };
                                        if (capa9.checked == true) {
                                                  capasSeleccionadas.push(capa9.value);
                                        };
                                        if (capa10.checked == true) {
                                                  capasSeleccionadas.push(capa10.value);
                                        };
                                        if (capa11.checked == true) {
                                                  capasSeleccionadas.push(capa11.value);
                                        };
                                        if (capa12.checked == true) {
                                                  capasSeleccionadas.push(capa12.value);
                                        };
                                        if (capa13.checked == true) {
                                                  capasSeleccionadas.push(capa13.value);
                                        };
                                        if (capa14.checked == true) {
                                                  capasSeleccionadas.push(capa14.value);
                                        };
                                        if (capa15.checked == true) {
                                                  capasSeleccionadas.push(capa15.value);
                                        };

                                        console.log(capasSeleccionadas);

                                        if (miPunto == null) {
                                                  errorUbicacion.innerHTML = "Seleccione una ubicación para hacer el área de servicio.";
                                        } else {

                                                  errorUbicacion.innerHTML = "";

                                                  var entidades = [];
                                                  entidades.push(miUbicacion);

                                                  var ubicaciones = new FeatureSet();
                                                  ubicaciones.features = entidades;

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

                                                  tareaAreaDeServicio.solve(parametrosAreaDeServicio, function (resultado) {

                                                            var simboloPoligono = new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color([255, 255, 255]), 1), new Color([255, 0, 0, 0.25]));

                                                            dojo.forEach(resultado.serviceAreaPolygons, function (areaServicio) {

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

                                                            dojo.forEach(capasSeleccionadas, function (parametro) {

                                                                      var miURLConsulta = miMapa.itemInfo.itemData.operationalLayers[parametro].url;
                                                                      var simbolo = miMapa.itemInfo.itemData.operationalLayers[parametro].layerObject.renderer.symbol;

                                                                      var miTareaDeConsulta = new QueryTask(miURLConsulta);
                                                                      miTareaDeConsulta.execute(consulta, function (resultado) {

                                                                                if (resultado.features.length > 0) {

                                                                                          for (var i = 0; i < resultado.features.length; i++) {

                                                                                                    var geometria = resultado.features[i].geometry;

                                                                                                    punto = new Graphic(geometria, simbolo);

                                                                                                    miMapa.graphics.add(punto);
                                                                                          };
                                                                                };
                                                                      });
                                                            });

                                                            // for (var i = 0; i < capasSeleccionadas.length; i++) {

                                                            //   var capaIterada = capasSeleccionadas[i];

                                                            //   console.log(capaIterada);

                                                            //   var miURLConsulta = miMapa.itemInfo.itemData.operationalLayers[capaIterada].url;

                                                            //   var simbolo = miMapa.itemInfo.itemData.operationalLayers[capaIterada].layerObject.renderer.symbol;

                                                            //   var miTareaDeConsulta = new QueryTask(miURLConsulta);

                                                            //   miTareaDeConsulta.execute(consulta, function(resultado) {

                                                            //     if (resultado.features.length > 0) {

                                                            //       for (var i = 0; i < resultado.features.length; i++){

                                                            //         var geometria = resultado.features[i].geometry;

                                                            //         var simboloGenerico = new SimpleMarkerSymbol(
                                                            //           SimpleMarkerSymbol.STYLE_SQUARE, 
                                                            //           10,
                                                            //           new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0]), 1),
                                                            //           new Color([0,0,0])
                                                            //         );

                                                            //         punto = new Graphic(geometria, simbolo);

                                                            //         miMapa.graphics.add(punto);

                                                            //       };

                                                            //     }; 

                                                            //   });

                                                            // };

                                                            miPunto = null;
                                                  }, function (err) {
                                                            console.log(err.message);
                                                  });
                                        }
                              };
                    },

                    onClose: function onClose() {
                              console.log('PFM_ServiceArea::onClose');

                              this.map.graphics.clear();
                    }

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
//# sourceMappingURL=Widget_versionAnterior_2.js.map
