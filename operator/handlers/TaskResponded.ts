export const TaskRespondedHandleMMServiceManager = async (
  event: any,
  pair: any,
  Agent: any,
  AgentTask: any
) => {
  await Agent.upsert({
    create: {
      id: event.args.agent,
      base: pair.base,
      quote: pair.quote,
      assignedTask: event.args.taskHash,
    },
  });
};