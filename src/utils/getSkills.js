import {skills} from "../pages/skills-data";

export const flattenObject = (obj) => {
    let result = {};

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.keys(obj[key]).forEach(subKey => {
                result[`${key}.${subKey}`] = obj[key][subKey];
            });
        } else {
            result[key] = obj[key];
        }
    });
    return Object.values(result)
}

export const allSkillsArray = flattenObject(skills);


export const getSkillsByEducationName = (skillsArray, educationName) => {
    return skillsArray.filter(skill => skill.education.includes(educationName))
}