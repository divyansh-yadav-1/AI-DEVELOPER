import  * as projectService from '../services/project.service.js';
import projectModel from '../models/project.model.js';
import userModel from '../models/user.model.js';
import { validationResult } from 'express-validator';

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { name } = req.body;
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const userId=loggedInUser._id;
    
        try {
            const { name, description } = req.body;
        
            // Check if project already exists
            const existingProject = await projectModel.findOne({ name });
            if (existingProject) {
              return res.status(400).json({ message: 'Project with this name already exists' });
            }
        
            // Create new project
            const newProject = await projectModel.create({ name, description });
            res.status(201).json(newProject);
          } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
          }
    }
    catch(err){
        console.error(err); 
        res.status(400).send(err.message); 
    }
}
