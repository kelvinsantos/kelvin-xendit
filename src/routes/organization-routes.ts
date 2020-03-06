import * as express from "express";
const router = express.Router();

// import utilities
import RouterUtil from "../utils/router-utils";

// import handlers
import OrganizationCommentHandler from "../handlers/organization/comment-handler";
import OrganizationMemberHandler from "../handlers/organization/member-handler";

const routerUtil = new RouterUtil(router);

const organizationHandler = new OrganizationCommentHandler();
routerUtil.buildGetRoute("/:organization/comments", organizationHandler.get);
routerUtil.buildPostRoute("/:organization/comments", organizationHandler.insert);
routerUtil.buildDeleteRoute("/:organization/comments", organizationHandler.delete);

const organizationMemberHandler = new OrganizationMemberHandler();
routerUtil.buildGetRoute("/:organization/members", organizationMemberHandler.get);

export default router;