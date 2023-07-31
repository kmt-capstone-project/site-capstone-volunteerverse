/** Routes for authentication. */
import express from "express";
import { Volunteer } from "../models/volunteer";

const volunteerRoutes = express.Router();

/** Route that fetches all the skills for the logged in volunteer */
volunteerRoutes.get("/skills", async function (req, res, next) {
  const { email } = res.locals.user;
  try {
    const result = await Volunteer.fetchAllSkills(email);
    res.status(200).json({skills: result});
  } catch (error) {
    next(error);
  }
});

/** Route that handles when a volunteer expresses interest in a project - adds it to database */
volunteerRoutes.put("/interest/:projectId", async function (req, res, next) {
  try {
    const projectId = parseInt(req.params.projectId);
    const {email } = res.locals.user;
    console.log("EMAIL VALUE IN VOLUNTEER: ", email)
    console.log("res.locals.user hereeee", res.locals.user)
    const result = await Volunteer.expressInterest(projectId, email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/** Route that returns the project feed for a volunteer */
volunteerRoutes.get("/projects", async function (req, res, next) {
  const { email } = res.locals.user;
  try{
    const result = await Volunteer.getVolunteersProjectFeed(email);
    res.status(200).json(result)
  } catch (error){
    next (error)
  }
});

export { volunteerRoutes };
