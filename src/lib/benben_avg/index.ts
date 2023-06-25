import Project from './lib/Project';

const project = new Project();
const json = project.serialize();
console.log(json);

export { Project };

// export function hello(name) {
//     console.log(`hello ${name}`);
//   }
