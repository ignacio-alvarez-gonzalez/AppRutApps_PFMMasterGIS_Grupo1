function ocultar(esto) {
    vista = document.getElementById(esto).style.display;
    if (vista == 'none') vista = 'flex';else vista = 'none';

    document.getElementById(esto).style.display = vista;
    document.getElementById(esto).style.flexDirection = 'column';
}
define(['dojo/_base/declare', 'jimu/BaseWidget'], function (declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

        // Custom widget code goes here

        baseClass: 'info-rut',
        // this property is set by the framework when widget is loaded.
        // name: 'InfoRut',
        // add additional properties here

        //methods to communication with app container:
        postCreate: function postCreate() {
            this.inherited(arguments);
            console.log('InfoRut::postCreate');
        }

        // startup: function() {
        //   this.inherited(arguments);
        //   console.log('InfoRut::startup');
        // },

        // onOpen: function(){
        //   console.log('InfoRut::onOpen');
        // },

        // onClose: function(){
        //   console.log('InfoRut::onClose');
        // },

        // onMinimize: function(){
        //   console.log('InfoRut::onMinimize');
        // },

        // onMaximize: function(){
        //   console.log('InfoRut::onMaximize');
        // },

        // onSignIn: function(credential){
        //   console.log('InfoRut::onSignIn', credential);
        // },

        // onSignOut: function(){
        //   console.log('InfoRut::onSignOut');
        // }

        // onPositionChange: function(){
        //   console.log('InfoRut::onPositionChange');
        // },

        // resize: function(){
        //   console.log('InfoRut::resize');
        // }

        //methods to communication between widgets:

    });
});
//# sourceMappingURL=Widget.js.map
