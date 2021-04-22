define(['dojo/_base/declare', 'jimu/BaseWidget'], function (declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

        // Custom widget code goes here

        baseClass: 'survey123',
        // this property is set by the framework when widget is loaded.
        // name: 'Survey123',
        // add additional properties here

        //methods to communication with app container:
        postCreate: function postCreate() {
            this.inherited(arguments);
            console.log('Survey123::postCreate');
        }

        // startup: function() {
        //   this.inherited(arguments);
        //   console.log('Survey123::startup');
        // },

        // onOpen: function(){
        //   console.log('Survey123::onOpen');
        // },

        // onClose: function(){
        //   console.log('Survey123::onClose');
        // },

        // onMinimize: function(){
        //   console.log('Survey123::onMinimize');
        // },

        // onMaximize: function(){
        //   console.log('Survey123::onMaximize');
        // },

        // onSignIn: function(credential){
        //   console.log('Survey123::onSignIn', credential);
        // },

        // onSignOut: function(){
        //   console.log('Survey123::onSignOut');
        // }

        // onPositionChange: function(){
        //   console.log('Survey123::onPositionChange');
        // },

        // resize: function(){
        //   console.log('Survey123::resize');
        // }

        //methods to communication between widgets:

    });
});
//# sourceMappingURL=Widget.js.map
