/** Routes for authentication. */
import express from "express";
import { Volunteer } from "../models/volunteer"

const volunteerRoutes = express.Router()

volunteerRoutes.get("/test", async function (req, res, next) {
  res.send("test voluteer")
})

volunteerRoutes.post("/skills", async function(req,res,next){
  const {email} = req.body
  const result = await Volunteer.fetchAllSkills(email)
  res.json({skills: result})
})

volunteerRoutes.post("/fetch", async function (req,res,next){
  const {email} = req.body
  const result = await Volunteer.fetchVolunteerByEmail(email)
  if (result){
    res.status(201).json(result)
  }else{
  res.json({error: "error"})}
})




volunteerRoutes.post("/interest/:projectId", async function (req, res, next){
  const projectId = parseInt(req.params.projectId)
  const {email} = req.body
  const result = await Volunteer.expressInterest(projectId, email)
  if (result) {
    res.status(201).json(result)
  } else {
    res.status(404).json( { error: 'Already expressed interest'} )
  }

})

volunteerRoutes.post("/projects", async function (req,res,next){
  const {email} = req.body
  const result = await Volunteer.getVolunteersProjectFeed(email)
  if (result) {
    res.status(201).json(result)
  } else {
    res.status(404).json( { error: 'fucked up'} )
  }
})



export {volunteerRoutes}