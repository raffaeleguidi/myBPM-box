Restivus.configure({
    useAuth: false,
    prettyJson: true
});

Restivus.addRoute('test', { authRequired: false }, {
    get: function () {
        log.info("I'm getting a test call");
        return { jsonType: 'weird', data: 'response from api call'};
    }
});

Restivus.addRoute('notification', { authRequired: false }, {
    get: function () {
        notifications.emit('message', 'Server Generated Message', Date.now());
        //log.info(notifications.get("lastUpdate"));
        log.info("I'm getting a notification of type %s for process %s - instance %s",
                        this.queryParams.eventType,
                        this.queryParams.processDefinitionId,
                        this.queryParams.processInstanceId
        )
        return { status: 'ok' };
    },
    post: function() {
        //notifications.emit('message', 'Server Generated Message', Date.now());
        log.info("eventType: %s", this.bodyParams.eventType);
        log.info("processDefinitionId: %s", this.bodyParams.processDefinitionId);
        log.info("processInstanceId: %s", this.bodyParams.processInstanceId);
        _.each(this.bodyParams.involvedUsers, function(user){
            log.info("user: %s", user)
        })
        var notification = this.bodyParams;
        notification.time = new Date().getTime();
        var result = Notifications.insert(notification);
        log.info("notification");
        log.info(notification);
        log.info(result);
        //log.info(Session.get("lastNotification"));
        return { status: 'ok' };
    }
});

/*
Restivus.addRoute('posts/:id', {authRequired: true}, {
    get: function () {
      var post = Posts.findOne(this.urlParams.id);
      if (post) {
        return {status: 'success', data: post};
      }
      return {
        statusCode: 404,
        body: {status: 'fail', message: 'Post not found'}
      };
    },
    post: {
      roleRequired: ['author', 'admin'],
      action: function () {
        var post = Posts.findOne(this.urlParams.id);
        if (post) {
          return {status: "success", data: post};
        }
        return {
          statusCode: 400,
          body: {status: "fail", message: "Unable to add post"}
        };
      }
    },
    delete: {
      roleRequired: 'admin',
      action: function () {
        if (Posts.remove(this.urlParams.id)) {
          return {status: "success", data: {message: "Item removed"}};
        }
        return {
          statusCode: 404,
          body: {status: "fail", message: "Item not found"}
        };
      }
    }
  });*/
