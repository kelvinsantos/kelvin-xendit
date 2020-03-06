import log4js from "log4js";
const logger = log4js.getLogger("info");

// import schemas
import Comments from "../../../schemas/comments"

// import types
import { OrganizationsRequest } from "../../../types/organizations"

/**
 * @module organization-queries.ts
 * @description Module used for calling organization queries.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 05, 2020
 */
class OrganizationQueries {
  public async getComments(requestParams: OrganizationsRequest) {
    logger.info("Called getComments with request parameters", requestParams);
    try {
      const comments = await Comments.find({ organization: requestParams.organization, is_deleted: { $ne: true } });
      return comments;
    } catch (error) {
      logger.error("There is something wrong while getting comments", error);
      return Promise.reject(error);
    }
  }
}

export = OrganizationQueries;