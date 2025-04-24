import { Router } from "express";
import { body, param } from 'express-validator'
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/projects";
import { hasAuthorization, taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";


const router : Router = Router()

router.use(authenticate)

// ================================= ROUTES FOR PROJECTS===========================

// Create
router.post('/',
  body('projectName')
  .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
  body('clientName')
  .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
  body('description')
  .notEmpty().withMessage('La descripción del Proyecto es Obligatoria'),
  handleInputErrors,
  ProjectController.createProject 
)


// Read
router.get('/', authenticate, ProjectController.getAllProjects )

router.get('/:id',
  param('id').isMongoId().withMessage('ID no Válido'),
  handleInputErrors,
  ProjectController.getProjectById 
)


// Update
router.put('/:projectId',
  param('projectId').isMongoId().withMessage('ID no Válido'),
  body('projectName')
  .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
  body('clientName')
  .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
  body('description')
  .notEmpty().withMessage('La descripción del Proyecto es Obligatoria'),
  handleInputErrors,
  hasAuthorization,
  ProjectController.updateProject 
)


// Delete
router.delete('/:projectId',
  param('projectId').isMongoId().withMessage('ID no Válido'),
  handleInputErrors,
  hasAuthorization,
  ProjectController.deleteProject 
)



// ================================= ROUTES FOR TASKS=============================

// Params
router.param('projectId', projectExists) // aplica tambien a update y delete projects
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)


// Create
router.post('/:projectId/tasks',
  hasAuthorization,
  body('name')
  .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
  body('description')
  .notEmpty().withMessage('La descripción de la tarea es Obligatoria'),
  TaskController.createTask
)


// Read
router.get('/:projectId/tasks',
  TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no Válido'),
  handleInputErrors,
  TaskController.getTaskById
)


// Update
router.put('/:projectId/tasks/:taskId',
  hasAuthorization,
  param('taskId').isMongoId().withMessage('ID no Válido'),
  body('name')
  .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
  body('description')
  .notEmpty().withMessage('La descripción de la tarea es Obligatoria'),
  handleInputErrors,
  TaskController.updateTask
)


// Delete
router.delete('/:projectId/tasks/:taskId',
  hasAuthorization,
  param('taskId').isMongoId().withMessage('ID no Válido'),
  handleInputErrors,
  TaskController.deleteTask
)


// Update Status
router.post('/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('status')
  .notEmpty().withMessage('El estado es obligatorio'),
  handleInputErrors,
  TaskController.updateStatus
)


// Teams
// Read
router.post('/:projectId/team/find',
  body('email')
  .isEmail().toLowerCase().withMessage('El email es obligatorio'),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
)

router.get('/:projectId/team',
  TeamMemberController.getProjectTeam
)

// Add
router.post('/:projectId/team',
  body('id')
  .isMongoId().withMessage('Id no válido'),
  handleInputErrors,
  TeamMemberController.addMemberById
)

// delete
router.delete('/:projectId/team/:userId',
  param('userId')
  .isMongoId().withMessage('Id no válido'),
  handleInputErrors,
  TeamMemberController.removeMemberById
)


// ================================= ROUTES FOR NOTES===========================
// Create
router.post('/:projectId/tasks/:taskId/notes',
  body('content')
  .notEmpty().withMessage('El contenido de la nota es Obligatorio'),
  handleInputErrors,
  NoteController.createNote
)


// Read
router.get('/:projectId/tasks/:taskId/notes',
  NoteController.getTaskNotes
)

// Delete
router.delete('/:projectId/tasks/:taskId/notes/:noteId',
  param('noteId').isMongoId().withMessage('ID no Válido'),
  handleInputErrors,
  NoteController.deleteNote
)


export default router