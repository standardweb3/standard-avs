export const MMRegisteredHandleTasks = async (event: any, Agent: any) => {
  await Agent.create({
    data: {
      id: event.args.agent
    },
  });
};
