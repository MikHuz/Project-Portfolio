/**
 * step_doorvisions.js — DEPRECATED
 *
 * This Playwright-based approach was too slow and unreliable against DoorVisions.
 * The site uses React synthetic events and heavy async rendering — programmatic
 * DOM clicks regularly took 20-30 minutes and still failed.
 *
 * REPLACED BY: browser tool screenshot+act approach in the sub-agent task.
 * See: tasks/house_call_pro_tasks/add_customer_image_task.md (Step 2)
 *
 * Keeping this file for reference only. Do not use.
 */
