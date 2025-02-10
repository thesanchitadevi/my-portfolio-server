"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/authentication/auth.routes");
const project_route_1 = require("../modules/projects/project.route");
const user_routes_1 = require("../modules/user/user.routes");
const blog_route_1 = require("../modules/blogs/blog.route");
const message_route_1 = require("../modules/message/message.route");
const router = (0, express_1.Router)();
// Application routes
const moduleRoutes = [
    {
        path: '/auth',
        module: auth_routes_1.AuthRouter,
    },
    {
        path: '/projects',
        module: project_route_1.ProjectRouter,
    },
    {
        path: '/blogs',
        module: blog_route_1.BlogRouter,
    },
    {
        path: '/messages',
        module: message_route_1.MessageRouter,
    },
    {
        path: '/users',
        module: user_routes_1.UserRouter,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.module);
});
exports.default = router;
