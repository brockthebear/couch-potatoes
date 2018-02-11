let sections = [
    {
        depth: 0,
        title: "Home",
        slug: "home",
        componentName: "Home",
    },
    {
        depth: 0,
        title: "User Profile",
        slug: "user_profile",
        componentName: "User",
    },
];

// Add section numbers.
sections = sections.reduce(
  (acc, section) => {
      let { major, minor, patch, sections } = acc;
      const { depth } = section;

      if (depth === 0) {
          major++;
          minor = 0;
          patch = 0;
      } else if (depth === 1) {
          minor++;
          patch = 0;
      } else {
          patch++;
      }

      sections.push({ ...section, major, minor, patch });

      return { ...acc, major, minor, patch };
  },
  { sections: [], major: 0, minor: 0, patch: 0 }
).sections;

// Add {parent} to patch sections
sections = sections.reduce(
  (acc, section) => {
      let { parent, sections } = acc;
      const { depth } = section;

      if (depth === 0) {
          sections.push(section);
          parent = null;
      } else if (depth === 1) {
          sections.push(section);
          parent = section.slug;
      } else {
          sections.push({ ...section, parent });
      }

      return { ...acc, parent };
  },
  { sections: [], parent: null }
).sections;

export default sections;

const matches = (path, section) => {
    let normalizedPath = path;

    if (normalizedPath.startsWith("/")) {
        normalizedPath = normalizedPath.slice(1);
    }

    return normalizedPath === section.slug;
};

export const getSection = (path, offset = 0) => {
    const index = sections.findIndex(section => matches(path, section));

    if (index === -1) {return null;}

    return sections[index + offset];
};

export const getNextSection = path => getSection(path, 1);

export const getPreviousSection = path => getSection(path, -1);

export const chapters = sections.reduce((ch, section) => {
    const { depth } = section;

    if (depth === 0) {
        ch.push([]);
    }

    ch[ch.length - 1].push(section);

    return ch;
}, []);
