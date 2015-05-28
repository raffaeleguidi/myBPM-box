Template.body.events({
    'click .page-title': function () {
        reset();
        return false;
    },
    'keydown body': function(evt){
        console.log(evt);
    }
});

Meteor.startup(function () {
    Bpm.refreshTaskList();
    $( document ).ready(function() {
        $(document).on('keydown', function (evt) {
            //console.log(evt.keyCode);
            //if (evt.target != document.body) return;
            switch(evt.keyCode) {
                case 82: $('.refresh').click(); return; // r
                case 67: return; // c
                case 13: if (!Session.get("currentTask")) {
                            $('.claim').first().click();
                         } else $('.complete').click(); return; // enter key
                case 37: return; // left key
                case 39: return; // right key
            }
        });
    });
});
