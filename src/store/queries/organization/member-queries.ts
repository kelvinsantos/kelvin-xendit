import * as request from "request-promise-native";
import config from "config";
import log4js from "log4js";
const logger = log4js.getLogger("info");

// import types
import { OrganizationsRequest } from "../../../types/organizations"

/**
 * @module member-queries.ts
 * @description Module used for calling member queries.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 05, 2020
 */
class MemberQueries {
  public async getMembers(requestParams: OrganizationsRequest) {
    logger.info("Called getMembers with request parameters", requestParams);
    try {
      const baseUrl = config.get("thirdPartyApi.github.githubApiBaseUrl");
      const options = {
        url: `${baseUrl}/orgs/${requestParams.organization}/members`,
        method: "GET",
        headers: { "User-Agent": requestParams.userAgent },
        json: true
      };
      const members = await request.get(options);

      return Promise.all(members.map(async (member: any) => {
        return {
          login: member.login,
          avatar_url: member.avatar_url,
          number_of_followers: await this.getFollowers(member).then(followers => followers.length),
          number_of_following: await this.getFollowing(member).then(following => following.length)
        }
      }));
    } catch (error) {
      logger.error("There is something wrong while getting members", error);
      return Promise.reject(error);
    }
  }
  private async getFollowers(member: any) {
    try {
      const baseUrl = config.get("thirdPartyApi.github.githubApiBaseUrl");
      const options = {
        url: `${baseUrl}/users/${member.login}/followers`,
        method: "GET",
        headers: { "User-Agent": "kelvinsantos" },
        json: true
      };
      const followers = await request.get(options);
      return followers;
    } catch (error) {
      logger.error("There is something wrong while getting followers", error);
    }
  }
  private async getFollowing(member: any) {
    try {
      const baseUrl = config.get("thirdPartyApi.github.githubApiBaseUrl");
      const options = {
        url: `${baseUrl}/users/${member.login}/following`,
        method: "GET",
        headers: { "User-Agent": "kelvinsantos" },
        json: true
      };
      const following = await request.get(options);
      return following;
    } catch (error) {
      logger.error("There is something wrong while getting following", error);
      return Promise.reject(error);
    }
  }
}

export = MemberQueries;