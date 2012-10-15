var CreditUnion = new Backbone.Model.extend({
    defaults: {
        id: "",
        name: "",
        url: ""
    },
    initialize: function() {

    }
});

var Supporter = new Backbone.Model.extend({
    defaults: {
        id: "",
        userName: "",
        facebookInfo: "",
        isSubscribed: true
    },
    initialize: function() {

    }
})

var AppUser = new Backbone.Model.extend({
    defaults: {
        id: "",
        creditUnionId: 0,
        userName: ""
    },
    initialize: function() {

    }
})

var Campaign = new Backbone.Model.extend({
    defaults: {
        id: "",
        creditUnionId: 0,
        name: "",
        message: "",
        isActive: true
    },
    initialize: function() {

    }
})


