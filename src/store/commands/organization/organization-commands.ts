import log4js from "log4js";
const logger = log4js.getLogger("info");

// import schemas
import Comments from "../../../schemas/comments"

// import types
import { OrganizationsRequest } from "../../../types/organizations"
import { CommentsRequest } from "../../../types/comments"

/**
 * @module organization-commands.ts
 * @description Module used for calling organization commands.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 05, 2020
 */
class OrganizationCommands {
  public async insertComment(requestParams: CommentsRequest) {
    logger.info("Called insertComment with request parameters", requestParams);
    try {
      const newComment = new Comments({
        organization: requestParams.organization,
        comment: requestParams.comment
      });
      newComment.save()
      return newComment._id;
    } catch (error) {
      logger.error("There is something wrong while inserting comments", error);
      return Promise.reject(error);
    }
  }
  public async deleteComment(requestParams: OrganizationsRequest) {
    logger.info("Called deleteComment with request parameters", requestParams);
    try {
      return await Comments.updateMany({ organization: requestParams.organization, is_deleted: { $ne: true } }, { "$set": { "is_deleted": true } })
    } catch (error) {
      logger.error("There is something wrong while deleting comments", error);
      return Promise.reject(error);
    }
  }
}

export = OrganizationCommands;