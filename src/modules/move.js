// we will save the scent areas in an array as strings (e.g. 11 for x: 1, y: 1) for easier comparison
let scentAreas;

// record all moves to simulate them later
let history;

/**
 * Read the user input (instructions)
 * @param  {string} data The input
 * @return {object}      An object like {martianArea: {x, y}, robots: [{x, y, d, directions}]}
 */
const readInstructions = data => {
  const robots = [];
  const lines = data.split('\n');

  const area = lines[0].split(' ');
  const martianArea = {
    x: parseInt(area[0], 10),
    y: parseInt(area[1], 10)
  };

  // iterate the lines to parse the input data
  for (let i = 1; i < lines.length; i++) {
    // start parsing only if first character is a digit
    if (/[0-9]/.test(lines[i][0])) {
      const position = lines[i].split(' ');
      const robot = {
        x: parseInt(position[0], 10),
        y: parseInt(position[1], 10),
        d: position[2],
        directions: lines[i + 1]
      };

      robots.push(robot);
    }
  }

  return {martianArea, robots};
};

/**
 * The function to determine the robot next position when the instructions says to move forward
 * @param  {number} x The current x position
 * @param  {number} y The current y position
 * @param  {string} d The current direction
 * @return {object}   An object like {x, y, d}
 */
const moveForward = ({x, y, d}) => {
  let newPosition;

  if (d === 'E') {
    newPosition = {x: x + 1, y, d};
  } else if (d === 'W') {
    newPosition = {x: x - 1, y, d};
  } else if (d === 'N') {
    newPosition = {x, y: y + 1, d};
  } else if (d === 'S') {
    newPosition = {x, y: y - 1, d};
  }

  return newPosition;
};

/**
 * The function to determine the robot next position when the instructions says to move left
 * @param  {number} x The current x position
 * @param  {number} y The current y position
 * @param  {string} d The current direction
 * @return {object}   An object like {x, y, d}
 */
const moveLeft = ({x, y, d}) => {
  const config = {
    W: 'S',
    E: 'N',
    N: 'W',
    S: 'E'
  };

  return {x, y, d: config[d]};
};

/**
 * The function to determine the robot next position when the instructions says to move right
 * @param  {number} x The current x position
 * @param  {number} y The current y position
 * @param  {string} d The current direction
 * @return {object}   An object like {x, y, d}
 */
const moveRight = ({x, y, d}) => {
  const config = {
    W: 'N',
    E: 'S',
    N: 'E',
    S: 'W'
  };

  return {x, y, d: config[d]};
};

/**
 * Find the position for the robot based on the martianArea and the directions
 * @param  {object} martianArea  An object like {x, y}
 * @param  {object} robotDetails An object like {x, y, d, directions}
 * @return {object}              An object like {robot: {x, y, d, directions}, status}
 */
const findPosition = (martianArea, robotDetails) => {
  let status = '';
  let newPosition;

  let robot = Object.assign({}, robotDetails);

  // read the directions one by one
  const directions = robot.directions;
  for (let i = 0; i < directions.length; i++) {
    if (directions[i] === 'F') {
      newPosition = moveForward(robot);
    } else if (directions[i] === 'R') {
      newPosition = moveRight(robot);
    } else if (directions[i] === 'L') {
      newPosition = moveLeft(robot);
    }

    const area = robot.x.toString() + robot.y.toString();
    // check if the robot is lost
    if (newPosition.x < 0 || newPosition.y < 0 || newPosition.x > martianArea.x || newPosition.y > martianArea.y) {
      // only if it's not a scentArea the robot will be lost
      if (!scentAreas.includes(area)) {
        status = 'LOST';
        scentAreas.push(area);
        history.push({
          x: robot.x,
          y: robot.y,
          type: 'scentArea'
        });

        // break for loop, robot vanished in the outer space
        break;
      }
    } else {
      history.push(newPosition);
      robot = newPosition;
    }
  }

  return {
    robot,
    status
  };
};

const moveRobots = ({martianArea, robots}) => {
  const finalPositions = [];
  for (let i = 0; i < robots.length; i++) {
    history.push(robots[i]);
    finalPositions.push(findPosition(martianArea, robots[i]));
  }

  return finalPositions;
};

/**
 * Validate the user input
 * We perform a basic set of validations
 * If the input data is completely different to what we expect, the app will crash and burn!
 * @param  {object} martianArea An object like {x, y}
 * @param  {array}  robots      An array of robots. Each robot an object like {x, y, d, directions}
 * @return {string}             An error string. Empty string if no errors found
 */
const validate = ({martianArea, robots}) => {
  let error = '';

  if (martianArea.x > 50 || martianArea.y > 50) {
    error = 'ERROR - Coordinates must be 50 or less';
  } else if (!robots.every(element => element.directions.length <= 100)) {
    error = 'ERROR - Directions must be 100 or less';
  }

  return error;
};

/**
 * Move the robots on mars!
 * @param  {string} givenIstructions The input string
 * @return {object}                  An object like {result: []|string, history: [], martianArea: {x, y}}
 */
const move = givenIstructions => {
  // reset scentAreas and history
  scentAreas = [];
  history = [];

  // read the input
  const instructions = readInstructions(givenIstructions);

  // let's do some validations
  let result;
  const error = validate(instructions);

  if (error) {
    result = error;
  } else {
    result = moveRobots(instructions);
  }

  return {
    result,
    history,
    martianArea: instructions.martianArea
  };
};

export default move;
