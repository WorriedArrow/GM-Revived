let goosemodScope = {};

export const setThisScope = (scope) => {
  goosemodScope = scope;

  const Commands = getModule();
  const Hook = goosemod.webpackModules.findByProps('useApplicationCommandsDiscoveryState');

  goosemodScope.patcher.patch(Hook, 'useApplicationCommandsDiscoveryState', (_, res) => {
    const gmCommands = res.commands.filter((x, i) => x.applicationId === applicationId && res.commands.indexOf(x) === i);
    const gmSection = Commands.BUILT_IN_SECTIONS[applicationId];

    res.discoveryCommands.push(...gmCommands);
    res.discoverySections.push({
      data: gmCommands,
      section: gmSection,
      key: applicationId
    });

    res.applicationCommandSections.push(gmSection);
    
    return res;
  });
};

const getModule = () => goosemodScope.webpackModules.findByProps('BUILT_IN_COMMANDS', 'BUILT_IN_SECTIONS');

const applicationId = '827187782140428288';

const addSection = (obj) => getModule().BUILT_IN_SECTIONS[obj.id] = obj;
const removeSection = (id) => delete getModule().BUILT_IN_COMMANDS[id];
const hasSection = (id) => !!getModule().BUILT_IN_SECTIONS[id];

export const add = (name, description, execute, options = []) => {
  const mod = getModule();

  if (!hasSection(applicationId)) { // If no GooseMod section, create it
    addSection({
      id: applicationId,
      icon: '7f274cc3c1216505238ce047ce6e35e9', // Avatar file name for application

      name: 'GooseMod',
      type: 1
    });
  }

  mod.BUILT_IN_COMMANDS.push({
    applicationId: applicationId,

    type: 0,
    target: 1,

    description,
    name,
    execute,
    options,

    id: `-${Math.random().toString().split('.')[1].substring(0, 5)}` // Randomly generate ID
  });
};

export const remove = (name) => {
  const mod = getModule();

  mod.BUILT_IN_COMMANDS = mod.BUILT_IN_COMMANDS.filter(x => x.name !== name); // Filter out commands with given name

  const gmCommands = mod.BUILT_IN_COMMANDS.filter(x => x.applicationId === applicationId); // Find GooseMod commands via applicationId

  if (gmCommands.length === 0) { // If there is currently no GooseMod commands, remove the section
    removeSection(applicationId);
  }
};
