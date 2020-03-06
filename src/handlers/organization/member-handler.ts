import { Request, Response, NextFunction } from "express";

// import queries
import OrganizationMemberQueries from "../../store/queries/organization/member-queries";

// import types
import { OrganizationsRequest } from "../../types/organizations"

/**
 * @module member-handler.ts
 * @description Module used for creating api handlers.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 05, 2020
 */
class OrganizationMemberHandler {
  public async get(req: Request, res: Response, next: NextFunction) {
    const input: OrganizationsRequest = {
      organization: req.params.organization,
      userAgent: req.get("User-Agent")
    }
    const organizationMemberQuery = new OrganizationMemberQueries();
    await organizationMemberQuery.getMembers(input).then((members: any) => {
      // sorting members in descending order by the number of followers.
      const sortedMembers = members.sort((a: { number_of_followers: any; }, b: { number_of_followers: any; }) => Number(b.number_of_followers) - Number(a.number_of_followers));
      return res.status(200).json(sortedMembers);
    }).catch(error => {
      return res.status(422).send(error);
    });

  }
}

export = OrganizationMemberHandler;