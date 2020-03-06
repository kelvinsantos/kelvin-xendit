import { Request, Response, NextFunction } from "express";

// import commands
import OrganizationCommands from "../../store/commands/organization/organization-commands";

// import queries
import OrganizationQueries from "../../store/queries/organization/organization-queries";

// import types
import { OrganizationsRequest } from "../../types/organizations"
import { CommentsRequest } from "../../types/comments"

/**
 * @module comment-handler.ts
 * @description Module used for creating api handlers.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 05, 2020
 */
class OrganizationCommentHandler {
  public async get(req: Request, res: Response, next: NextFunction) {
    const input: OrganizationsRequest = {
      organization: req.params.organization
    }
    const organizationQuery = new OrganizationQueries();
    organizationQuery.getComments(input).then(comments => {
      return res.status(200).json(comments);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async insert(req: Request, res: Response, next: NextFunction) {
    const input: CommentsRequest = {
      organization: req.params.organization,
      comment: req.body.comment
    }
    const organizationCommand = new OrganizationCommands();
    await organizationCommand.insertComment(input).then(insertComment => {
      return res.status(200).json({ _id: insertComment });
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const input: OrganizationsRequest = {
      organization: req.params.organization
    }
    const organizationCommand = new OrganizationCommands();
    await organizationCommand.deleteComment(input).then(deleteComment => {
      return res.status(200).json(deleteComment);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
}

export = OrganizationCommentHandler;