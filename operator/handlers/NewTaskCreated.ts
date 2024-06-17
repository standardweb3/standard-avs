export const NewTaskCreatedHandleTasks = async (
    event: any,
    AgentTask: any
  ) => {
    await AgentTask.create({
      data: {
        id: event.args.taskIndex,
        name: event.args.task.name,
        createdBlock: event.args.task.createdBlock,
        base: event.args.base,
        quote: event.args.quote,
      }
    })
  }