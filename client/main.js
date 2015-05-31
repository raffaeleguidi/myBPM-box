log.info("Bpm application started");

Template.main.rendered = function() {
    $('.procdeflist').hide();
}

Template.main.events({
    'click .refresh': function (evt) {
        Bpm.reset();
    },
    'click .create': function (evt) {
        Bpm.refreshProcessDefinitions();
        Session.set("showStartBox", true);
    },
    'click .page-title': function () {
        reset();
        return false;
    },
    'keydown body': function(evt){
        //console.log(evt);
    }
});

Router.configure({layoutTemplate: 'main'});

Meteor.startup(function () {
    Bpm.refreshTaskList();
    Bpm.refreshInbox();
//    Bpm.refreshProcessDefinitions();
    
    // should implement an event handler, instead
    // http://www.activiti.org/userguide/#eventDispatcher
    var interval = 50000;
    setInterval (function() {
        if (new Date().getTime() - Session.get("taskList").lastUpdate.getTime() > interval)
        Bpm.refreshTaskList(Session.get("taskList").currentPage);
        Bpm.refreshInbox();
    }, interval);

    $( document ).ready(function() {
        $('.collapsible').collapsible({
          accordion : false 
        });
        
        $(document).on('keydown', function (evt) {
            /*log.info(evt.keyCode);
            log.info(evt.target);*/
            if (evt.target != document.body) return;
            switch(evt.keyCode) {
                case 82: $('.refresh').click(); return; // r
                case 67: $('.create').click(); return; // c
                case 13: if (!Session.get("currentTask")) {
                            $('.open').first().click();
                         } else $('.complete').click(); return; // enter key
                case 37: return; // left key
                case 39: return; // right key
            }
        });
    });
});
