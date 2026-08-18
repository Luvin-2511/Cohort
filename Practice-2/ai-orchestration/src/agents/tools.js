import axios from 'axios'
import { tool } from 'langchain'
import * as z from 'zod'

export const listFiles = tool(
  async ({ }, config) => {
    const writer = config.writer || config.context?.writer || (() => {})
    writer('Listing Files from the project directory...\n')
    const response = await axios.get(
      `http://sandbox-service-${config.context.projectId}:3000/list-files`
    )
    writer('Files Listed sucecessfully...\n')
    return JSON.stringify(response.data.files)
  },
  {
    name: 'list-files',
    description:
      'List all the files in the project directory. This is useful for understanding what files are available to work with',
    schema: z.object({}).describe('List of all the files')
  }
)

export const updateFiles = tool(
  async ({ files }, config) => {
    const writer = config.writer || config.context?.writer || (() => {})
    writer('Updating Files from the project directory...\n')
    const response = await axios.patch(
      `http://sandbox-service-${config.context.projectId}:3000/update-files`,
      {
        updates: files
      }
    )
    writer('Files Updated sucecessfully...\n')
    return JSON.stringify(response.data)
  },
  {
    name: 'update-files',
    description:
      'Update the content of specified files .This is useful for making changes in the files based on the tasks',
    schema: z.object({
      files: z
        .array(
          z.object({
            file: z.string().describe('The absolute path of file to update'),
            content: z.string().describe('The new content for the file')
          })
        )
        .describe('The list of files to update and their new content')
    })
  }
)

export const readFiles = tool(
  async ({ files }, config) => {
    const writer = config.writer || config.context?.writer || (() => {})
    writer('Reading Files from the project directory...\n')
    const response = await axios.get(
      `http://sandbox-service-${config.context.projectId}:3000/read-files?files=` +
      files.join(',')
    )
    writer('Files Read sucecessfully...\n')
    return JSON.stringify(response.data)
  },
  {
    name: 'read-files',
    description:
      'Read the content of the specified files. This is useful for understanding the context of files',
    schema: z.object({
      files: z
        .array(z.string())
        .describe(
          'The list of files absolute path to read .These should be files that were listed using the listFiles tool'
        )
    })
  }
)

export const createFiles = tool(
  async ({ files }, config) => {
    const writer = config.writer || config.context?.writer || (() => {})
    writer('Creating Files in the project directory...\n')
    const response = await axios.post(
      `http://sandbox-service-${config.context.projectId}:3000/create-files`,
      { files }
    )
    writer('Files Created sucecessfully...\n')
    return JSON.stringify(response.data)
  },
  {
    name: 'create-files',
    description: 'Create new files in the project directory.',
    schema: z.object({
      files: z.array(
        z.object({
          file: z.string().describe('The absolute path of the file to create'),
          content: z.string().describe('The content of the file')
        })
      )
    })
  }
)
